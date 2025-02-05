import bcrypt from "bcryptjs";
import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
  email: string;
  password: string;
  roles: string[];
  isVerified: boolean;
  failedAttempts: number;
  lockedUntil: Date | null;
  refreshToken: string | null;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ["user"] },
  isVerified: { type: Boolean, default: false },
  failedAttempts: { type: Number, default: 0 },
  lockedUntil: { type: Date, default: null },
  refreshToken: { type: String, default: null },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

userSchema.methods.comparePassword = function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

export const User = model<IUser>("User", userSchema);

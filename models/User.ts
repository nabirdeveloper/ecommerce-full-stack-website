import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  image?: string;
  role: 'customer' | 'editor' | 'manager' | 'super_admin';
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  wishlist: mongoose.Types.ObjectId[];
  provider?: string;
  providerId?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.provider; // Password required only for non-OAuth users
    },
  },
  image: {
    type: String,
  },
  role: {
    type: String,
    enum: ['customer', 'editor', 'manager', 'super_admin'],
    default: 'customer',
  },
  phone: {
    type: String,
    trim: true,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String,
  },
  wishlist: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  provider: {
    type: String,
    enum: ['google', 'credentials'],
  },
  providerId: {
    type: String,
  },
}, {
  timestamps: true,
});

// Create indexes for better performance
UserSchema.index({ email: 1 });
UserSchema.index({ role: 1 });

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
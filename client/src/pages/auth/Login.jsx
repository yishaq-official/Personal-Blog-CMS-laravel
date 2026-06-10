import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // If already logged in, redirect to admin
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await login(data);
      toast.success('Successfully logged in');
      navigate('/admin');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to login. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--bg-dark)] p-4 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-[var(--accent)] rounded-full mix-blend-multiply filter blur-[128px] opacity-30"></div>
      <div className="absolute top-1/3 -right-20 w-72 h-72 bg-[var(--danger)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>
      <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-96 h-96 bg-[var(--accent-hover)] rounded-full mix-blend-multiply filter blur-[128px] opacity-20"></div>

      <div className="glass-card w-full max-w-md relative z-10 animate-slide-up text-[var(--text-light)]">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">Welcome Back</h1>
          <p className="text-[var(--text-muted)]">Sign in to manage your blog</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Email Address"
            type="email"
            placeholder="admin@blog.com"
            icon={Mail}
            error={errors.email?.message}
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
          />

          <div className="relative">
            <Input
              label="Password"
              type={showPassword ? 'text' : 'password'}
              placeholder="••••••••"
              icon={Lock}
              error={errors.password?.message}
              {...register('password', { 
                required: 'Password is required',
                minLength: { value: 6, message: 'Password must be at least 6 characters' }
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-[2.1rem] text-gray-400 hover:text-white transition-colors focus:outline-none"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <Button 
            type="submit" 
            className="w-full mt-4 py-2.5" 
            loading={isLoading}
          >
            Sign In
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;

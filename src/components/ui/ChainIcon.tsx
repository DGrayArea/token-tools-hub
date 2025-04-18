
import { ChainType } from '@/types/token';

interface ChainIconProps {
  chain: ChainType;
  size?: 'sm' | 'md' | 'lg';
}

export const ChainIcon = ({ chain, size = 'md' }: ChainIconProps) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
  };

  const renderIcon = () => {
    switch (chain) {
      case 'ethereum':
        return (
          <div className={`${sizeClasses[size]} bg-blue-900 rounded-full flex items-center justify-center`}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3/4 w-3/4">
              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#627EEA"/>
              <path d="M20.6597 7.5V16.1L27.9988 19.4042L20.6597 7.5Z" fill="white" fillOpacity="0.6"/>
              <path d="M20.6599 7.5L13.32 19.4042L20.6599 16.1V7.5Z" fill="white"/>
              <path d="M20.6597 27.3107V32.4875L28.0014 21.9395L20.6597 27.3107Z" fill="white" fillOpacity="0.6"/>
              <path d="M20.6599 32.4875V27.3099L13.32 21.9395L20.6599 32.4875Z" fill="white"/>
              <path d="M20.6597 25.5646L27.9988 20.1927L20.6597 16.8945V25.5646Z" fill="white" fillOpacity="0.2"/>
              <path d="M13.32 20.1927L20.6599 25.5646V16.8945L13.32 20.1927Z" fill="white" fillOpacity="0.6"/>
            </svg>
          </div>
        );
      case 'bsc':
        return (
          <div className={`${sizeClasses[size]} bg-yellow-900 rounded-full flex items-center justify-center`}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3/4 w-3/4">
              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#F3BA2F"/>
              <path d="M20 10L15.53 14.47L13 12L20 5L27 12L24.47 14.47L20 10Z" fill="white"/>
              <path d="M20 16L15.53 20.53L13 18L20 11L27 18L24.47 20.47L20 16Z" fill="white"/>
              <path d="M20 22L15.53 26.53L13 24L20 17L27 24L24.47 26.47L20 22Z" fill="white"/>
              <path d="M20 28L15.53 32.53L13 30L20 23L27 30L24.47 32.47L20 28Z" fill="white"/>
            </svg>
          </div>
        );
      case 'solana':
        return (
          <div className={`${sizeClasses[size]} bg-purple-900 rounded-full flex items-center justify-center`}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3/4 w-3/4">
              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#000000"/>
              <path d="M10 14H30L26 18H6L10 14Z" fill="#14F195"/>
              <path d="M10 26H30L26 30H6L10 26Z" fill="#14F195"/>
              <path d="M10 20H30L26 24H6L10 20Z" fill="#14F195"/>
            </svg>
          </div>
        );
      case 'base':
        return (
          <div className={`${sizeClasses[size]} bg-blue-900 rounded-full flex items-center justify-center`}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3/4 w-3/4">
              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#0052FF"/>
              <path d="M20 8L20 32L30 20L20 8Z" fill="white"/>
              <path d="M20 8L10 20L20 32L20 8Z" fill="white" fillOpacity="0.55"/>
            </svg>
          </div>
        );
      case 'arbitrum':
        return (
          <div className={`${sizeClasses[size]} bg-blue-900 rounded-full flex items-center justify-center`}>
            <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-3/4 w-3/4">
              <path d="M20 40C31.0457 40 40 31.0457 40 20C40 8.9543 31.0457 0 20 0C8.9543 0 0 8.9543 0 20C0 31.0457 8.9543 40 20 40Z" fill="#2D374B"/>
              <path d="M20 8L26 18H14L20 8Z" fill="#28A0F0"/>
              <path d="M14 18L20 28L26 18H14Z" fill="#28A0F0"/>
              <path d="M20 28L14 18L8 28H20Z" fill="#28A0F0" fillOpacity="0.75"/>
              <path d="M20 28L26 18L32 28H20Z" fill="#28A0F0" fillOpacity="0.75"/>
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return renderIcon();
};

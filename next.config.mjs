/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // opção simples: liberar domínios
    domains: ['i.pinimg.com'],
    // ou, se preferir mais controle, use remotePatterns:
    // remotePatterns: [
    //   {
    //     protocol: 'https',
    //     hostname: 'i.pinimg.com',
    //   },
    // ],
  },
};

export default nextConfig;

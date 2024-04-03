/** @type {import('next').NextConfig} */
const nextConfig = {
    env:{
        DB_URL:"mongodb+srv://admin:12345@cluster0.1bc1kfi.mongodb.net/forms"
    },
    NEXTAUTH_SECRET:"A1.b2.c3."
};

export default nextConfig;

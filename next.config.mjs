/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        DB_URL: "mongodb+srv://admin:12345@cluster0.1bc1kfi.mongodb.net/forms",
        NEXTAUTH_SECRET: "A1.b2.c3.",
        NEXTAUTH_URL: "http://localhost:3000",
        EMAIL_HOST: "smtp.gmail.com",
        EMAIL_PORT: 587,
        EMAIL_USER: "umairjamaatali6465@gmail.com",
        EMAIL_PASS: "yxukfmhmyfyikcem",



        publicKey: "public_IuIlJm3zrHxJP/3vmy3pjXaZrGk=",
        urlEndpoint: "https://ik.imagekit.io/gm3p1cxm5",

        privateKey : "private_Sac9qLocLkxjPhaHHXaTMxvYdDE="
    },

    

};

export default nextConfig;

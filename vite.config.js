import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    // build: {
    //     outDir: "public/build",
    //     emptyOutDir: true,
    //     rollupOptions: {
    //         input: {
    //             main: "/src/main.jsx", // Assuming the 'src' folder is in the root of your project.
    //         },
    //     },
    // },
    resolve: {
        alias: {
            "@src": path.resolve(__dirname, "src"),
            "@images": path.resolve(__dirname, "src/assets/images"),
            "@components": path.resolve(__dirname, "src/views/components"),
            "@common": path.resolve(__dirname, "src/views/components/common"),
            "@pages": path.resolve(__dirname, "src/views/pages"),
            "@store": path.resolve(__dirname, "src/core/store"),
            "@services": path.resolve(__dirname, "src/core/services"),
            "@plugins": path.resolve(__dirname, "src/core/plugins"),
            "@api": path.resolve(__dirname, "src/core/api"),
            "@hooks": path.resolve(__dirname, "src/core/hooks"),
            "@utils": path.resolve(__dirname, "src/core/utils"),
        },
    },
});

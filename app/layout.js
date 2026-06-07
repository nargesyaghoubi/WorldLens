import "../styles/globals.css";
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"


export const metadata = {
    title: "World Explorer",
    description: "A Next.js country explorer project",
  };
  

  export default function RootLayout ({ children }){
    return(
        <html lang='en' suppressHydrationWarning data-theme="light">
            <body>
                <Navbar/>
                    <main className='container mx-auto px-4'> {children} </main>
                <Footer/>
            </body>

        </html>
    )
  }
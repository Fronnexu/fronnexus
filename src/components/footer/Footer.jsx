import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="p-6 h-[481] w-full ">
            <div className="flex justify-between  mb-4">
                <Image
                    src="assets/icons/logo.svg"
                    alt="Logo da empresa"
                    width={150}
                    height={150}
                />
                <div className="flex content-center pt-5 gap-2.5">
                    <Link href="" target="_blank">
                        <Image
                            src="/assets/icons/instagram.svg"
                            alt="Instagram"
                            width={24}
                            height={24}
                        />
                    </Link>
                    <Link href="" target="_blank">
                        <Image
                            src="/assets/icons/whatsapp.svg"
                            alt="Whatsapp"
                            width={24}
                            height={24}
                        />
                    </Link>

                    <Link href="" target="_blank">
                        <Image
                            src="/assets/icons/linkedin.svg"
                            alt="linkedin"
                            width={24}
                            height={24}
                        />
                    </Link>

                    <Link href="" target="_blank">
                        <Image
                            src="/assets/icons/facebook.svg"
                            alt="facebook"
                            width={24}
                            height={24}
                        />
                    </Link>

                    <Link href="" target="_blank">
                        <Image
                            src="/assets/icons/github.svg"
                            alt="github"
                            width={24}
                            height={24}
                        />
                    </Link>
                </div>



            </div>
            <div className="flex gap-6">
                <ul className="space-y-2 ml-4 gap-2.5">
                    <li><Link href="/" className="text-primary p-6">Home</Link></li>
                    <li><Link href="/services" className="text-primary p-6">Services</Link></li>
                    <li><Link href="/about" className="text-primary p-6">About Us</Link></li>
                    <li><Link href="/services" className="text-primary p-6">Projects</Link></li>
                    <li><Link href="/contact" className="text-primary p-6">Get in Touch</Link></li>

                    <div className="flex mt-9  text-[16px] text-primary ">
                        © {new Date().getFullYear()} Fronnexus. All rights reserved.
                    </div>
                </ul>
            </div>
        </footer>
    );
}

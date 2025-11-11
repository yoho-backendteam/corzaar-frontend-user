import ContactInfo from "../../Components/Queries/Queryinfo";
import ContactForm from "../../Components/Queries/Queryform";
import { FONTS } from "../../Constants/uiconstants";

export default function ContactPage() {
    return (
        <div className="w-full">

            <div className="bg-[#ED1C24] text-white text-center py-20 px-4">
                <h1 className="text-2xl md:text-3xl" style={{ ...FONTS.boldHeading as any}}>
                    Get in Touch
                </h1>
                <p className="max-w-2xl mx-auto text-sm md:text-base mt-2" style={{ ...FONTS.regular as any}}>
                    Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
            </div>

            <div className="bg-[#FFD321] px-4 py-10 md:py-10 flex flex-col md:flex-row gap-8 md:gap-10 justify-center">
                <div className="w-full md:w-[350px] lg:w-[380px]">
                    <ContactInfo />
                </div>

                <div className="w-full md:w-[350px] lg:w-[980px]">
                    <ContactForm />
                </div>
            </div>

        </div>
    );
}

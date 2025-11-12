import { COLORS, FONTS } from "../../Constants/uiconstants";
import { contactInfo, quickLinks } from "../../redux/Queries/querydata";

export default function ContactInfo() {
    return (
        <div className="bg-white p-6 rounded-xl shadow w-full max-w-sm mx-auto md:mx-0">
            <h2 className="font-semibold mb-1" style={{ ...FONTS.boldHeading1 }}>
                Contact Information
            </h2>

            <p
                className="text-sm text-gray-500 mb-3"
                style={{ ...FONTS.regular1, color: COLORS.primary_gray }}
            >
                Fill out the form and our team will get back to you within 24 hours.
            </p>

            {contactInfo.map((item, index) => (
                <div
                    key={index}
                    className="flex gap-3 items-start bg-white rounded-xl shadow p-4 mb-4 hover:shadow-lg transition"
                >
                    {item.isImage ? (
                        <img src={item.icon} className="w-12 h-12 p-2 bg-red-50 rounded-full" />
                    ) : (
                        <span className="text-3xl w-12 h-12 flex items-center justify-center p-2 rounded-full bg-red-50 text-red-500">
                            {item.icon}
                        </span>
                    )}

                    <div className="min-w-0 flex-1 overflow-hidden">
                        <h4 className="whitespace-normal break-word" style={{ ...FONTS.regular2 }}>
                            {item.title}
                        </h4>

                        {item.value.split("\n").map((line, i) => (
                            <p
                                key={i}
                                className="whitespace-normal break-word text-sm"
                                style={{ ...FONTS.regular1, color: COLORS.primary_gray }}
                            >
                                {line}
                            </p>
                        ))}

                        {item.desc && (
                            <p
                                className="whitespace-normal break-word text-sm"
                                style={{ ...FONTS.boldHeading2, color: COLORS.primary_gray }}
                            >
                                {item.desc}
                            </p>
                        )}
                    </div>

                </div>
            ))}

            <div className="bg-[#ED1C24] p-4 rounded-lg text-white mt-4">
                <p className="font-semibold mb-2" style={{ ...FONTS.regular1 }}>
                    Quick Links
                </p>
                {quickLinks.map((l, i) => (
                    <p key={i} className="text-sm cursor-pointer hover:underline" style={{ ...FONTS.regular1 }}>
                        {l}
                    </p>
                ))}
            </div>
        </div>
    );
}

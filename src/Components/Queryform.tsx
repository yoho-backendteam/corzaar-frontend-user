import { useDispatch, useSelector } from "react-redux";
import { updateField } from "../redux/Queries/queryslice";
import { selectContactForm } from "../redux/Queries/queryselector";
import { categories } from "../redux/Queries/querydata";
import sndimg from "../assets/send.png";
import { COLORS, FONTS } from "../Constants/uiconstants";

export default function ContactForm() {
    const dispatch = useDispatch();
    const form = useSelector(selectContactForm);
    const change = (f, v) => dispatch(updateField({ field: f, value: v }));

    return (
        <div className="bg-white p-6 md:p-7 rounded-xl shadow w-full">
            <h2 className="text-right font-semibold" style={{ ...FONTS.boldHeading3 }}>
                Send Us A Message<br/><br/>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-8">

                {[
                    ["fullName", "Full Name"],
                    ["email", "Email Address"],
                    ["phone", "Phone Number"],
                ].map(([field, label]) => (
                    <div key={field}>
                        <label className="block mb-1" style={{ ...FONTS.boldHeading4 }}>{label}</label>
                        <input
                            className="p-3 w-full shadow-md rounded-xl focus:outline-none"
                            value={form[field]}
                            placeholder={label}
                            style={{ ...FONTS.medium, color: COLORS.primary_gray }}
                            onChange={(e) => change(field, e.target.value)}
                        />
                    </div>
                ))}

                <div>
                    <label className="block mb-1" style={{ ...FONTS.boldHeading4 }}>Category</label>
                    <select
                        className="p-3 w-full shadow-md rounded-xl focus:outline-none"
                        value={form.category}
                        onChange={(e) => change("category", e.target.value)}
                        style={{ ...FONTS.medium, color: COLORS.primary_gray }}
                    >
                        <option>Select a Category</option>
                        {categories.map((c) => <option key={c}>{c}</option>)}
                    </select>
                </div>
            </div>

            <label className="block mb-1" style={{ ...FONTS.boldHeading4 }}>Subject</label>
            <input
                className="p-3 w-full shadow-md rounded-xl focus:outline-none mb-4"
                value={form.subject}
                placeholder="Brief description"
                onChange={(e) => change("subject", e.target.value)}
                style={{ ...FONTS.medium, color: COLORS.primary_gray }}
            />

            <label className="block mb-1" style={{ ...FONTS.boldHeading4 }}>Message</label>
            <textarea
                className="p-3 w-full shadow-md rounded-xl focus:outline-none h-28"
                value={form.message}
                placeholder="Tell us more about your inquiry"
                onChange={(e) => change("message", e.target.value)}
                style={{ ...FONTS.medium, color: COLORS.primary_gray }}
            ></textarea>

            <div className="text-right py-11">
                <button className="bg-[#ED1C24] px-6 py-3 text-white rounded-lg flex items-center gap-3 float-right">
                    <img src={sndimg} className="w-5" />
                    Send Message
                </button>
            </div>
        </div>
    );
}

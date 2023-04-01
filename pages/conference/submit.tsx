import React, {useState} from "react";
import axios from "axios";
import withAuth from "@/hoc/withAuth";
import Cookies from "js-cookie";

const Submit = () => {
    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState<string>("");
    const [abstract, setAbstract] = useState("");
    const [keywords, setKeywords] = useState<string>("");
    const [file, setFile] = useState<File | null>();

    const API_BASE_URL = "http://localhost:8081/api"
    const token = Cookies.get("jwt");

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            return;
        }

        // Check if the file size exceeds the maximum allowed size
        if (file.size > 10000000) { // 10 MB in bytes
            // Show an error message or handle the situation as needed
            return;
        }

        const formData = new FormData();
        formData.append("title", title);
        formData.append("authors", authors);
        formData.append("abstract", abstract);
        formData.append("keywords", keywords);
        formData.append("file", file);

        try {
            const response = await axios.post(`${API_BASE_URL}/submission`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${token}`,
                }
            });
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <label>
                Title:
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
            </label>
            <label>
                Author:
                <input type="text" value={authors} onChange={(e) => setAuthors(e.target.value)} required />
            </label>
            <label>
                Abstract:
                <textarea value={abstract} onChange={(e) => setAbstract(e.target.value)} required />
            </label>
            <label>
                Keywords:
                <input type="text" value={keywords} onChange={(e) => setKeywords(e.target.value)} required />
            </label>
            <label>
                Paper File:
                <input
                    type="file"
                    onChange={(e) => {
                        if (e.target.files) {
                            setFile(e.target.files[0]);
                        }
                    }}
                    required
                    // file max size is 10MB
                    accept=".pdf,.doc,.docx,.odt,.txt"
                    size={10485760}
                />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default withAuth(Submit);
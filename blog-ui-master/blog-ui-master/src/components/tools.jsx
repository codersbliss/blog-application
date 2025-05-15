import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Image from "@editorjs/image";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import Code from "@editorjs/code";
import uploadImageToServer from "../commons/context";

const uploadImageByURL = async (e) => {
    let link = new Promise((resolved, rejected) => {
        try {
            resolved(e);
        } catch (err) {
            rejected(err);
        }
    })
    const url = await link;
    return {
        success: 1,
        file: url
    };
}


export const tools = {
    embed: Embed,
    list: {
        class: List,
        inlineToolbar: true
    },
    image: {
        class: Image,
        config: {
            uploader: {
                uploadByFile: async (file) => {
                    console.log(file);
                    try {
                        let img = await uploadImageToServer(file);
                        console.log(img);
                        const IMG_URL = `${import.meta.env.VITE_SERVER_DOMAIN}/file/name/${img}`;
                        console.log(IMG_URL);
                        return {
                            success: 1,
                            file: {
                                url: IMG_URL,
                            }
                        }
                    } catch (error) {
                        console.error("Error uploading file:", error);
                        return {
                            success: 0,
                            message: "File upload failed"
                        };
                    }
                },
                uploadByUrl: uploadImageByURL,
            }
        }
    },
    header: {
        class: Header,
        config: {
            placeholder: "Type Heading.....",
            levels: [2,3,4,5],
            defaultLevel: 4
        }
    },
    quote: {
        class: Quote,
        inlineToolbar: true
    },
    marker: Marker,
    code: Code
}


import {useState} from "react"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter"
import {darcula} from "react-syntax-highlighter/dist/esm/styles/prism"

/**
 * @description - 👋🏻 Root Component
 * @returns {JSX.Element}
 * @constructor
 */
const Root = () => {
    // Example
    const [markdown, setMarkdown] = useState(`
# Welcome to Markdown Editor 👋🏻
\`\`\`js
console.log("Hello World")
\`\`\`
    `)

    //  It's a function that takes an event and sets the state of `markdown` to the value of the event.
    const onChange = (e) => setMarkdown(e.target.value)

    return <>
        <h2 className="text-center text-xl xl:text-3xl bg-[#2c2c2c] text-white font-bold p-3 xl:py-4">
            ✏️ Markdown Editor
        </h2>
        <div className="grid grid-cols-2 w-full h-screen">
            <textarea
                className="textarea bg-[#eff1f5] p-[20px] text-sm sm:text-md md:text-lg"
                onChange={onChange}
                value={markdown}
            />
            <ReactMarkdown
                className="p-[20px] markdown-body"
                children={markdown}
                remarkPlugins={[remarkMath, remarkGfm]}
                rehypePlugins={[rehypeKatex]}
                components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                children={String(children).replace(/\n$/, '')}
                                style={darcula}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            />
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    }
                }}
            />
        </div>
    </>
}

export default Root

import { Link } from "react-router-dom";

interface LinkToProps {
    url: string,
    text: string
}

function LinkTo({ url, text }: LinkToProps) {
    return (
        <Link
            to={url}
            className="text-center text-gray-300 font-normal"
        >
        {text}
        </Link>
    )
}
export default LinkTo
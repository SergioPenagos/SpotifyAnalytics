import Link from "next/link"

export default function Navbar() {
    return(
        <nav className="nav">
            <Link href="/" className="site-title">
                Spotify
            </Link>
            <ul>
                <li className="active">
                    <Link href="/login">Analyze</Link>
                </li>
                <li>
                    <Link href="/about">About</Link>
                </li>
            </ul>
        </nav>
    )
}
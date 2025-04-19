import Lending from "../components/Lending";
import { User } from "../lib/types";

interface HomeProps {
    currentUser: User | null;
}

export default function Home({ currentUser }: HomeProps) {
    return <Lending currentUser={currentUser} />;
}

export async function getServerSideProps(context: any) {
    return {
        props: {
            currentUser: null,
        },
    };
}
type Props = {
    name: string;
    avatar: string;
    response: string;
};

export default function AgentResponseCard({ name, avatar, response }: Props) {
    return (
        <div className="bg-[#1f1f1f] rounded-xl p-5 flex gap-4 items-start shadow hover:shadow-lg transition-all">
            <img src={avatar} alt={name} className="w-16 h-16 rounded-full object-cover" />
            <div className="text-white">
                <h3 className="font-semibold text-lg mb-1">{name}</h3>
                <p className="text-gray-300 text-sm whitespace-pre-wrap">{response}</p>
            </div>
        </div>
    );
}

import AgentResponseCard from './AgentResponseCard';

type Props = {
    responses: {
        name: string;
        avatar: string;
        response: string;
    }[];
};

export default function ResponseList({ responses }: Props) {
    return (
        <div className="space-y-4 mt-6">
            {responses.map((agent, index) => (
                <AgentResponseCard key={index} {...agent} />
            ))}
        </div>
    );
}

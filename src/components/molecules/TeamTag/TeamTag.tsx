import { NameTag } from '@/components/atoms';

interface User {
    id: number;
    name: string;
    role: 'leader' | 'member';    
}

interface TeamTagProps {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    isSubmit?: boolean;
    team? : User[];   
}

const TeamTag = ({
    isSubmit = false,
    team = [],
    onClick,
}: TeamTagProps) => {

    const tagColor = isSubmit ? 'green' : 'red';
    const leader = team.find(member => member.role === 'leader');
    const members = team.filter(member => member.role === 'member');

    return (
        <div 
        onClick={onClick}
        className="rounded-md px-3 py-2 border border-gray-300 bg-gray-25 flex items-center gap-2">
            {leader && (
                <NameTag 
                    isLeader={true}
                    color={tagColor}
                >
                    {leader.name}
                </NameTag>
            )}
            {members.length > 0 && members.map(member => (
                <NameTag 
                    key={member.id}
                    color={tagColor}
                >
                    {member.name}
                </NameTag>
            ))}
        </div>
    );
};

export default TeamTag;

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function StatBlock({
  stats,
}: {
  stats: { name: string; value: number; unit?: string }[];
}) {
  return (
    <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
      {stats.map((stat, statIdx) => (
        <Card key={stat.name}>
          <CardHeader>
            <CardTitle>{stat.name}</CardTitle>
            <CardDescription>{stat.value}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
}

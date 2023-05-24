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
  stats: { name: string; value: string; unit?: string }[];
}) {
  return (
    // <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4">
    //   {stats.map((stat, statIdx) => (
    //     <div
    //       key={stat.name}
    //       className={classNames(
    //         statIdx % 2 === 1
    //           ? "sm:border-l"
    //           : statIdx === 2
    //           ? "lg:border-l"
    //           : "",
    //         "border-t py-6 px-4 sm:px-6 lg:px-8"
    //       )}
    //     >
    //       <p className="text-sm font-medium leading-6 text-gray-400">
    //         {stat.name}
    //       </p>
    //       <div className="mt-2 flex items-baseline gap-x-2">
    //         <div className="text-4xl font-semibold tracking-tight text-primary">
    //           {stat.value}
    //         </div>
    //         {stat.unit ? (
    //           <span className="text-sm text-gray-400">{stat.unit}</span>
    //         ) : null}
    //       </div>
    //     </div>
    //   ))}
    // </div>
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

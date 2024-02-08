import React from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';

import 'react-calendar-heatmap/dist/styles.css';
import 'app/components/calendarHeatmap.css';

interface Contribution {
	color: string;
	contributionCount: number;
	date: string;
}

interface ContributionWeek {
  contributionDays: Array<Contribution>;
}

interface GitHubActivityListProps {
  contributionGraph: {
    totalContributions: number;
    weeks: Array<ContributionWeek>
  };
  role: string;
}

export const GitHubActivityList: React.FC<GitHubActivityListProps> = ({ contributionGraph, role }) => {
	const startDate = new Date(contributionGraph.weeks[0].contributionDays[0].date);
	const endDate = new Date(contributionGraph.weeks.slice(-1)[0].contributionDays.slice(-1)[0].date);

	return (
    <div>
			<h3>
				Total Contributions: {contributionGraph.totalContributions}
			</h3>
			<h4>
				Role: {role}
			</h4>
			<CalendarHeatmap
				startDate={startDate}
				endDate={endDate}
				values={contributionGraph.weeks.flatMap((week) => {
					return week.contributionDays.map((day) => {
						return {
							date: new Date(day.date),
							count: day.contributionCount,
						};
					});
				})}
				onClick={value => alert(`${value?.count} contributions on ${value?.date.toISOString().slice(0, 10)}`)}
				showWeekdayLabels
				classForValue={(value) => {
					if (!value || value.count === 0) {
						return 'color-empty';
					}
					return value.count < 4 ? `color-scale-${value.count}` : `color-scale-4`;
				}}
			/>
    </div>
  );
};
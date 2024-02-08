import type { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { GitHubActivityList } from 'app/components/GitHubActivityList';
import { getGitHubContributionActivity } from 'app/routes/api/gitHubContributionActivity';
import appStylesHref from "app/styles/shared.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export const loader = async () => {
  const githubContributionActivity = await getGitHubContributionActivity();
  return githubContributionActivity;
};

interface YearAndRole {
  [year: number]: string;
}

const yearAndRoleMap : YearAndRole = {
  2018: 'Software Engineer, Backend with Ruby on Rails',
  2019: 'Software Engineer, Backend with Ruby on Rails',
  2020: 'Software Engineer, Backend with Ruby on Rails + Frontend with React, Typescript',
  2021: 'Lead Software Engineer, Frontend with React, Typescript',
  2022: 'Senior Lead Software Engineer, Frontend with React, Typescript',
  2023: 'Engineering Manager, Frontend with React, Typescript',
}

export default function Index() {
  const fetchGitHubActivity = useLoaderData<typeof loader>();

  const  githubHandle = 'narcisacodreanu';
  return (
    <div className="container">
      <h1>
        <a href={`https://github.com/${githubHandle}`} target="_blank" rel="noopener noreferrer" className="github-link">
          Narcisa 
        </a>{`'s`} GitHub Showcase
      </h1>
      {fetchGitHubActivity.map((contributionData, index) => (
        <div key={index}>
          <h2>{`GitHub Activity for ${2023 - index}`}</h2>
          <GitHubActivityList contributionGraph={contributionData} role={yearAndRoleMap[2023 - index]}/>
        </div>
      ))}
    </div>
  );
}

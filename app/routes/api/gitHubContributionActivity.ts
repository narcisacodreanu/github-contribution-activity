export async function getGitHubContributionActivity() {
  const token = process.env.GITHUB_ACCESS_TOKEN;
  const years = Array.from({ length: 2023 - 2018 + 1 }, (_, index) => 2023 - index);

  const contributionsDataArray = await Promise.all(
    years.map(async (year) => {
      const start = `${year}-01-01T00:00:00Z`;
      const end = `${year}-12-31T23:59:59Z`;

      const response = await fetch('https://api.github.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query($startDate: DateTime, $endDate: DateTime) {
              viewer {
                contributionsCollection(from: $startDate, to: $endDate) {
                  contributionCalendar {
                    totalContributions
                    weeks {
                      contributionDays {
                        color
                        contributionCount
                        date
                      }
                    }
                  }
                }
              }
            }
          `,
          variables: {
            startDate: start,
            endDate: end,
          },
        }),
      });

      const data = await response.json();
      return data.data.viewer.contributionsCollection.contributionCalendar;
    })
  );
  
  return contributionsDataArray;
}

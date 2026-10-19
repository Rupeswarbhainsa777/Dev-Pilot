import { useEffect, useState } from "react";

const MyReposPage = () => {

    const [repos, setRepos] = useState([]);

    useEffect(() => {
        fetch("https://api.github.com/users/Rupeswarbhainsa777/repos")
            .then(response => response.json())
            .then(data => {
                setRepos(data);
            })
            .catch(error => console.error("Error fetching repositories:", error));
    }, []);

    return (
        <div>
            <h1>My Repositories</h1>

            {repos.map(repo => (
                <div key={repo.id}>
                    <h3>
                        <a href={repo.html_url} target="_blank" rel="noreferrer">
                            {repo.name}
                        </a>
                    </h3>

                    <p>{repo.description || "No description available"}</p>
                    <p>Language: {repo.language || "Not specified"}</p>
                    <p>⭐ Stars: {repo.stargazers_count}</p>
                </div>
            ))}
        </div>
    );
};

export default MyReposPage;
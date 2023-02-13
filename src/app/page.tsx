import { Project, projectColor, projects } from "@/utils/projects";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-darkslateblue flex h-screen min-h-screen flex-col items-center justify-center p-12">
      <div className="bg-white shadow sm:rounded-md">
        <ul role="list" className="divide-y divide-gray-200">
          {projects.map((project: Project) => (
            <li key={project.name}>
              <Link href={project.link}>
                <div className="px-4 py-4 sm:px-6">
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm font-medium text-indigo-600">
                      {project.name}
                    </p>
                    <div className="ml-2 flex flex-shrink-0">
                      <p
                        className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${projectColor(
                          project.difficulty
                        ).toString()}`}
                      >
                        {project.difficulty}
                      </p>
                    </div>
                  </div>
                  <div className="mt-2 flex-col sm:flex sm:justify-between">
                    <div className="sm:flex">
                      {project.tags.map((tag) => (
                        <p
                          key={tag}
                          className="flex items-center p-2 text-sm text-gray-500"
                        >
                          {tag}
                        </p>
                      ))}
                    </div>
                    <div className="flex items-center justify-center pt-8 text-center text-sm text-gray-500 sm:mt-0">
                      <svg
                        className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <p>
                        Completed on{" "}
                        <time dateTime="2020-01-07">{project.completed}</time>
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

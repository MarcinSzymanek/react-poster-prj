import { useLoaderData, useNavigation, Await } from "react-router";
import PostList from "../components/PostList";
import { getPosts } from "../api_service/apiService";
import { Suspense } from "react";
import Spinner from "../components/core/Spinner";
import { Outlet } from "react-router";

export function MainContent() {
  const loadData = useLoaderData();

  return (
    <>
      <main>
        <Outlet />
        <Suspense fallback={<Spinner />}>
          <Await
            resolve={loadData}
            children={(res) => {
              console.log(res.data.posts);
              return <PostList datap={res.data.posts} />;
            }}
          />
        </Suspense>
      </main>
    </>
  );
}

export async function loader() {
  let loadData = getPosts();
  console.log("loader loaddata");
  console.log(loadData);
  return loadData;
}

import { useRouter } from "next/router";
import { queryParamFrom } from "util/url";
import { FC, useEffect } from "react";
import Search from "components/Search";
import { useData } from "hooks/useData";
import LoadingIndicator from "components/LoadingIndicator";

type PostAuthor = {
  username: string;
  userId: string;
  joined: string;
  profileRank: string;
  postCount: number;
  location?: string;
  avatarPath?: string;
}

type Post = {
  postId: string;
  author: PostAuthor;
  content: string;
  lastEdited: string;
}

type Topic = {
  forumId: string;
  threadId: string;
  title: string;
  originalUrl: string;
  breadcrumbs: { url: string, label: string }[];
  totalPosts: number;
  pageNumber: number;
  totalPages: number;
  posts: Post[];
}

type PostContentProps = {
  topic: Topic;
  post: Post;
  isTopicStart: boolean;
}

const PostContent: FC<PostContentProps> = ({ topic, post, isTopicStart }) => {
  return (
    <div
      className="post rounded-md p-4 flex flex-col md:flex-row"
      id={post.postId}
    >
      <div className="p-2 md:pr-4 flex-grow">
        <h3>{`${isTopicStart ? '' : 'Re: '}${topic.title}`}</h3>
        <h5>by <span>{post.author.username}</span> » {post.lastEdited}</h5>
        <div
          className="py-2"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        />
      </div>
      <div className="p-2 md:p-4 border-t md:border-l border-gray-300 md:border-t-0 md:w-1/5 opacity-50 md:opacity-100">
        <h5>{post.author.username}</h5>
        <div className="text-sm">
          <div>{post.author.profileRank}</div>
          <div><span className="font-semibold">Posts:</span> {post.author.postCount}</div>
          <div><span className="font-semibold">Joined:</span> {post.author.joined}</div>
        </div>
      </div>
    </div>
  )
}

type TopicContentProps = {
  forumId: string;
  threadId: string;
}

const TopicContent: FC<TopicContentProps> = ({ forumId, threadId }) => {
  const { data: topic, error } = useData(`/thread/f-${forumId}-t-${threadId}.json`);

  if (error) {
    return (
      <div className="h-full flex flex-col justify-center">
        :(
      </div>
    );
  }
  if (!topic) {
    return (
      <div className="h-full flex flex-col justify-center">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-md flex flex-col space-y-6 border border-gray-100">
      <div>
        <div className="text-gray-500 pb-2">
          Forum Archive &gt; {topic.breadcrumbs[0].label}
        </div>
        <h2>{topic.title}</h2>
      </div>
      {topic.posts.map((post, index) =>
        <PostContent
          key={post.postId}
          topic={topic}
          post={post}
          isTopicStart={index === 0 && topic.pageNumber === 1}
        />
      )}
      <div className="py-2 text-center">
        <a
          href={`https://web.archive.org/web/${topic.originalUrl}`}
          target="_blank" rel="noreferrer noopener"
        >
          View cached original [Wayback machine]
        </a>
      </div>
    </div>
  )
}

export default function ViewTopicPage() {
  const router = useRouter();
  const forumId = queryParamFrom(router, 'f');
  const threadId = queryParamFrom(router, 't');
  const post = queryParamFrom(router, 'p'); // TODO - dont understand this.

  if (!forumId || !threadId) {
    useEffect(() => {
      router.push('/');
    });
  }

  return (
    <>
      <div className="p-4 mb-8 bg-yellow-300 flex flex-col space-y-2 rounded-md">
        <h3>You are viewing the Split Screen Van Club forum archive.</h3>

        <strong>The forum archive is read-only.</strong>

        <p className="text-xs">
          Unfortunately in 2021 the Split Screen Van Club forum suffered a ransomware attack and lots of the forum data was lost.
          <br/>
          What threads that have been recovered are now searchable on this site. Some threads may be incomplete and some images are still being recovered.
        </p>
      </div>

      <Search />

      <TopicContent forumId={forumId} threadId={threadId} />
    </>
  )
}

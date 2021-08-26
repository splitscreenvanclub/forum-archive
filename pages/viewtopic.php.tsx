import { useRouter } from "next/router";
import { queryParamFrom } from "util/url";
import { FC, useEffect } from "react";
import Search from "components/Search";
import { useData } from "hooks/useData";
import LoadingIndicator from "components/LoadingIndicator";
import SadEmoji from 'heroicons/outline/emoji-sad.svg';
import Link from 'next/link';
import Head from "next/head";

function fixPostContent(html) {
  return html
    .replace(/images\.thesamba\.com/gi, 'thesamba.com')
    .replace(/(https?:\/\/)?(www\.)?ssvc\.org\.uk\/phpbb/g, 'https://archives.ssvc.org.uk');
}

type PostAuthor = {
  username: string;
  userId: string;
  joined: string;
  profileRank: string;
  postCount: string;
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

type PaginationProps = {
  topic: Topic;
}

const PaginationControls: FC<PaginationProps> = ({ topic }) => {
  const { pageNumber, totalPages, forumId, threadId } = topic;
  const options = [];

  if (totalPages > 8 && pageNumber > 1) {
    options.push({ label: '<< First', pageNumber: 1 });
  }
  if (pageNumber > 1) {
    options.push({ label: '< Previous', pageNumber: pageNumber-1 });
  }

  if (totalPages <= 8) {
    for (let i = 1; i < totalPages; i++) {
      options.push({ label: i+'', pageNumber: i });
    }
  }
  else {
    for (let i = Math.max(1, pageNumber-3); i <= Math.min(totalPages, pageNumber+3); i++) {
      options.push({ label: i+'', pageNumber: i });
    }
  }

  if (pageNumber < totalPages) {
    options.push({ label: 'Next >', pageNumber: pageNumber+1 });
  }
  if (totalPages > 8 && pageNumber < totalPages) {
    options.push({ label: 'Last >>', pageNumber: totalPages });
  }

  return (
    <div className="flex space-x-2 items-center justify-center text-xs md:text-sm">
      {options.map(opt =>
        <div key={opt.label} className={opt.label.match(/[0-9]+/) && opt.pageNumber !== pageNumber ? 'hidden md:block' : ''}>
          {opt.pageNumber === pageNumber ?
            <span>{opt.label}</span>
            :
            <Link href={`/viewtopic.php?f=${forumId}&t=${threadId}&page=${opt.pageNumber}`}>
              <a>{opt.label}</a>
            </Link>
          }
        </div>
      )}
    </div>
  )
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
      <div className="p-2 md:pr-4 w-full md:w-4/5">
        <h3>{`${isTopicStart ? '' : 'Re: '}${topic.title}`}</h3>
        <h5>by <span>{post.author.username}</span> » {post.lastEdited}</h5>
        <div
          className="py-2 prose"
          dangerouslySetInnerHTML={{
            __html: fixPostContent(post.content),
          }}
        />
      </div>
      <div className="p-2 md:p-4 border-t md:border-l border-gray-300 md:border-t-0 md:w-1/5 opacity-50 md:opacity-100">
        <h5>{post.author.username}</h5>
        <div className="text-xs">
          {post.author.avatarPath && (
            <div className="hidden md:block">
              <img className="avatar" src={post.author.avatarPath} alt={post.author.username} />
            </div>
          )}
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
  page: string;
}

const TopicContent: FC<TopicContentProps> = ({ forumId, threadId, page }) => {
  const { data: topic, error } = useData(`/thread/f-${forumId}-t-${threadId}-page-${page}.json`);

  if (error) {
    return (
      <div className="h-full flex flex-col justify-center items-center w-full text-center">
        <SadEmoji className="w-8 mb-4" />
        <div>
          Sorry we couldn't load this page.
          <br/>
          Either this a broken link or we were unable to recover this page.
        </div>
      </div>
    );
  }
  if (!topic) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8">
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <div className="p-4 bg-white rounded-md flex flex-col space-y-6 border border-gray-100">
      <Head>
        <title>{topic.title} | The Split Screen Van Club</title>
      </Head>
      <div>
        <div className="text-gray-500 pb-2 flex flex-col md:flex-row justify-between items-center">
          <span>Forum Archive &gt; {(topic.breadcrumbs || [])[0]?.label}</span>
          <PaginationControls topic={topic} />
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
      <PaginationControls topic={topic} />
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
  const page = queryParamFrom(router, 'page') || '1';

  if (!forumId || !threadId) {
    useEffect(() => {
      router.push('/');
    });
  }

  return (
    <>
      <div className="p-4 mb-8 bg-yellow-300 flex flex-col space-y-2 rounded-md">
        <div className="text-brand font-bold">You are viewing the Split Screen Van Club forum archive.</div>

        <strong>The forum archive is read-only.</strong>

        <p className="text-xs">
          Unfortunately in 2021 the Split Screen Van Club forum suffered a ransomware attack and lots of the forum data was lost.
          <br/>
          What threads that have been recovered are now searchable on this site. Some threads may be incomplete and some images are still being recovered.
        </p>
      </div>

      <Search />

      <TopicContent forumId={forumId} threadId={threadId} page={page} />
    </>
  )
}

import { useRouter } from "next/router";
import { queryParamFrom } from "util/url";
import { FC } from "react";

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

const placeholderJson: Topic = {
  "forumId": "4",
  "threadId": "117046",
  "title": "NOS '65 Model Year Wiper Motor - SOLD",
  "originalUrl": "https://www.ssvc.org.uk/phpbb/viewtopic.php?t=117046",
  "breadcrumbs":  [
    {
      "url": "",
      "label": "Bus Parts For Sale"
    }
  ],
  "totalPosts": 5,
  "pageNumber": 1,
  "totalPages": 1,
  "posts": [
    {
      "postId": "881520",
      "author": {
        "username": "vwed",
        "userId": "34025",
        "joined": "Fri Mar 05, 2010 8:25 pm",
        "location": "Bristol",
        "profileRank": "SSVC Member",
        "avatarPath": "./download/file.php?avatar=38_1338322337.jpg",
        "postCount": 518
      },
      "content": "NOS exchange unit wiper motor.<br>\n211 955 111 N (X).<br>\n6 volt.<br>\nTested.<br>\nThis will fit Buses built between August '64 and end of July '65. (Chassis # 215 000 001 to 215 190 000).<br>\n                  It will not fit Buses built before or after these dates, so please check your chassis number/wiper set up.<br>\n                  Price: £100, cash, collect Bristol. £103 posted within the UK, PayPal as a gift/£108 not as a gift.<br>\n                  <img src=\"http://thesamba.com/vw/gallery/pix/1384175.jpg\" class=\"postimage\" alt=\"Image\"><br>\n                  <img src=\"http://thesamba.com/vw/gallery/pix/1384174.jpg\" class=\"postimage\" alt=\"Image\"><br>                  <img src=\"http://thesamba.com/vw/gallery/pix/1384173.jpg\" class=\"postimage\" alt=\"Image\"></div>",
      "lastEdited": "Mon Nov 06, 2017 12:48 pm"
    },
    {
     "postId": "881522",
      "author": {
        "username": "billywizkid",
        "userId": "35716",
        "joined": "Mon Aug 01, 2011 6:21 pm",
        "profileRank": "SSVC Member",
        "postCount": 24
      },
      "content": "Hi I'm interested in your wiper motor I'm in Gloucester my bus is USA 65 will it fit also do you have the mounting bracket and shafts",
      "lastEdited": "Tue Nov 07, 2017 9:20 am"
    }
  ]
};

type Props = {
  forumId: string;
  threadId: string;
}

const Thread: FC<Props> = ({ forumId, threadId }) => {
  const topic = placeholderJson; // TODO load it

  return (
    <div className="p-4 bg-white rounded-md flex flex-col space-y-6 border border-gray-100">
      <div>
        <div className="text-gray-500 pb-2">
          Forum Archive &gt; {topic.breadcrumbs[0].label}
        </div>
        <h2>{topic.title}</h2>
      </div>
      {topic.posts.map((post, index) => (
        <div
          className="post rounded-md p-4 flex"
          id={post.postId}
          key={post.postId}
        >
          <div className="p-2 pr-4 flex-grow">
            <h3>{`${index === 0 && topic.pageNumber === 1 ? '' : 'Re: '}${topic.title}`}</h3>
            <h5>by <span>{post.author.username}</span> » {post.lastEdited}</h5>
            <div className="py-2" dangerouslySetInnerHTML={{ __html: post.content }}></div>
          </div>
          <div className="p-4 w-1/5 border-l border-gray-300">
            <h5>{post.author.username}</h5>
            <div className="text-sm">
              <div>{post.author.profileRank}</div>
              <div><span className="font-semibold">Posts:</span> {post.author.postCount}</div>
              <div><span className="font-semibold">Joined:</span> {post.author.joined}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-center py-2">
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

  return (
    <>
      <div className="p-4 mb-8 bg-yellow-300 flex flex-col space-y-2 rounded-md">
        <h3>You are viewing the Split Screen Van Club forum archives.</h3>

        <strong>The forum archive is read-only.</strong>

        <p className="text-xs">
          Unfortunately in 2021 the Split Screen Van Club forum suffered a ransomware attack and lots of the forum data was lost.
          <br/>
          What threads that have been recovered are now restored on this site. Some threads may be incomplete and images are still being restored.
        </p>
      </div>

      <Thread forumId={forumId} threadId={threadId} />
    </>
  )
}

import React, { Suspense } from "react";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import Preview from "../editor/Preview";
import Votes from "../votes/Votes";
import { hasVoted } from "@/lib/actions/vote.action";

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
}: Answer) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });

  return (
    <article className="light-border border-b py-10">
      <span id={JSON.stringify(_id)} className="hash-span"></span>

      <div className="mb-5 flex flex-col-reverse justify-between gap-5 sm:flex-row">
        <div className="flex flex-1 items-start gap-1 sm:items-center">
          <UserAvatar
            id={author._id}
            name={author.name}
            imageUrl={author.image}
            className="size-5 rounded-full object-cover max-sm:mt-0.5"
          />
          <Link
            href={ROUTES.PROFILE(author._id)}
            className="flex flex-col sm:flex-row sm:items-center"
          >
            <p>{author.name ?? "Anonymous"}</p>
          </Link>
        </div>

        <div className="flex justify-end">
          <Suspense fallback={<div>Loading ...</div>}>
            <Votes
              targetType="answer"
              upvotes={upvotes}
              downvotes={downvotes}
              hasVotedPromise={hasVotedPromise}
              targetId={_id}
            />
          </Suspense>
        </div>
      </div>
      <Preview content={content} />
    </article>
  );
};

export default AnswerCard;

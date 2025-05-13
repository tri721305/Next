import React, { Suspense } from "react";
import UserAvatar from "../UserAvatar";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import Preview from "../editor/Preview";
import Votes from "../votes/Votes";
import { hasVoted } from "@/lib/actions/vote.action";
import { cn } from "@/lib/utils";
import EditDeleteAction from "../user/EditDeleteAction";

interface Props extends Answer {
  containerClasses?: string;
  showReadMore?: boolean;
  showActionBtns?: boolean;
}

const AnswerCard = ({
  _id,
  author,
  content,
  createdAt,
  upvotes,
  downvotes,
  question,
  containerClasses,
  showReadMore = false,
  showActionBtns = false,
}: Props) => {
  const hasVotedPromise = hasVoted({
    targetId: _id,
    targetType: "answer",
  });

  return (
    <article
      className={cn("light-border border-b py-10 relative", containerClasses)}
    >
      <span id={`answer-${_id}`} className="hash-span"></span>

      {showActionBtns && (
        <div className="background-light800 flex-center absolute -right-2 -top-5 size-9 rounded-full">
          <EditDeleteAction type="Answer" itemId={_id} />
        </div>
      )}

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
      {showReadMore && (
        <Link
          className="body-semibold relative z-10 font-space-grotest text-primary-500"
          href={`/questions/${question}#answer-${_id}`}
        >
          <p className="mt-1">Read more...</p>
        </Link>
      )}
    </article>
  );
};

export default AnswerCard;

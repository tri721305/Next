import Link from "next/link";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import { getQuestions } from "@/lib/actions/question.action";
import DataRenderer from "@/components/DataRenderer";
// import HomeFilter from "@/components/filters/HomeFilter";
import { EMPTY_QUESTION } from "@/constants/states";
import CommonFilter from "@/components/filters/CommonFilter";
import { HomePageFilters } from "@/constants/filters";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn React, can anyone help me?",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn JavaScript?",
    description: "I want to learn JavaScript, can anyone help me?",
    tags: [
      { _id: "1", name: "JavaScript" },
      { _id: "2", name: "JavaScript" },
    ],
    author: {
      _id: "1",
      name: "John Doe",
      image:
        "https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg",
    },
    upvotes: 10,
    answers: 5,
    views: 100,
    createdAt: new Date("2021-09-01"),
  },
];

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild
        >
          <Link href={ROUTES.ASK_QUESTION}>Ask a Question</Link>
        </Button>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherClasses="flex-1"
        />
        <CommonFilter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </section>
      <HomeFilter />
      <DataRenderer
        empty={EMPTY_QUESTION}
        success={success}
        error={error}
        data={questions}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />
      {/* {success ? (
        <div className="mt-10 flex w-full flex-col gap-6">
          {questions && questions.length > 0 ? (
            questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))
          ) : (
            <div className="mt-10 flex w-full items-center justify-center">
              <p className="text-dark400_light700">No questions found</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-10 flex-center w-full">
          <p className="text-dark400_light700">
            {error?.message || "Failed to fetch questions"}
          </p>
        </div>
      )} */}
    </>
  );
};

export default Home;

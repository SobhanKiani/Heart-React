import { Toast } from "components";
import Loading from "components/Loading/Loading";
import { useRef, FC, useState, useMemo, useEffect } from "react";
import { IoSearchOutline, IoCloseOutline } from "react-icons/io5";
import { useMutation } from "react-query";
import { createRoomApi } from "misc/api";
import { useToast } from "misc/hooks";

import { useSearch } from "misc/hooks/Query/useSearch";
import { SearchProps } from "misc/interfaces";
import "./Search.scss";
import { Result } from "./Result";

export const Search: FC<SearchProps> = ({}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [showResult, setShowResult] = useState<boolean>(false);
  const { createToast } = useToast();

  const searchQuery = useSearch(
    inputRef.current?.value,
    (data) => {
      if (data) {
        setShowResult(true);
      }
    },
    {
      retry: false,
      enabled: false,
    }
  );

  const createRoomMutate = useMutation(createRoomApi);

  useEffect(() => {
    const { data } = createRoomMutate;
    if (data) {
      if (data.status === 201) {
        createToast({
          message: "Room Created",
          emoji: {
            name: "✅",
            icon: "✅",
            size: 30,
          },
        });
      }
      if (data.status === 400) {
        createToast({
          message: data.data.errors[0].message,
          emoji: {
            name: "!",
            icon: "❗️",
            size: 30,
          },
        });
      }
      setShowResult(false);
    }
  }, [createRoomMutate.data]);

  return (
    <>
      <div className="search-bar-wrapper">
        <div className="search-bar">
          <div className="search-bar__input-wrapper">
            <input
              type="text"
              ref={inputRef}
              onChange={(e) => {
                inputRef.current.value = e.target.value;
              }}
              defaultValue={""}
            />
          </div>
          <div
            className="search-bar__button"
            onClick={() => {
              searchQuery.refetch();
            }}
          >
            <div className="search-bar__icon">
              <IoSearchOutline size={"2rem"} />
            </div>
          </div>
        </div>
      </div>

      <div className={`search-result-wrapper ${showResult && "active"}`}>
        {searchQuery.isLoading || createRoomMutate.isLoading ? (
          <Loading />
        ) : (
          <Result
            data={searchQuery.data}
            show={showResult}
            setShow={(isShowing: boolean) => setShowResult(isShowing)}
          />
        )}
      </div>
      <Toast />
    </>
  );
};

import { AnyAction } from "@reduxjs/toolkit";
import { ApiClient } from "../../network/client";
import { END_POINTS } from "../../network/contants";
import { setHeadlinesById } from "../reducers/homeReducer";
import { IHeadlinesById, IHeadline } from "../reducers/homeReducer/interfaces";
import { AppDispatch } from "../store";

export const fetchFreshHeadlines =
  (page: number, cb: () => void) => async (dispatch: AppDispatch) => {
    try {
      const res = await ApiClient.get(END_POINTS.topHeadlinea, {
        apiKey: "900f1dac5f3e4ab3984f45f0d2c61db5",
        q: "nature",
        pageSize: 40,
        page,
      });

      if (res?.articles) {
        const headlinesById: IHeadlinesById = {};

        res.articles.forEach((article: IHeadline, index: number) => {
          const uniqueId = Date.now().toString() + index;

          headlinesById[uniqueId] = article;
        });

        if (cb) {
          cb();
        }

        dispatch(setHeadlinesById(headlinesById));
      }
    } catch (e) {
      if (cb) {
        cb();
      }
    }
  };

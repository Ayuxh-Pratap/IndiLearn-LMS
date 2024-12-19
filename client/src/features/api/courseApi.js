import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

const COURSE_API = "http://localhost:8080/api/v1/course/"

export const courseApi = createApi({
    reducerPath: "courseApi",
    tagTypes: ['Refetch_Creator_Course'],
    baseQuery: fetchBaseQuery({
        baseUrl: COURSE_API,
        credentials: "include",
    }),
    endpoints: (builder) => ({
        createCourse: builder.mutation({
            query: ({ courseTitle, category }) => ({
                url: "",
                method: "POST",
                body: { courseTitle, category }
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getCreatorCourses: builder.query({
            query: () => ({
                url: "",
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
        editCourse: builder.mutation({
            query: ({ courseId, formData }) => ({
                url: `/${courseId}`,
                method: "PUT",
                body: formData
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getCourseById: builder.query({
            query: (courseId) => ({
                url: `/${courseId}`,
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
        createLecture: builder.mutation({
            query: ( { lectureTitle , courseId } ) => ({
                url: `/${courseId}/lecture`,
                method: "POST",
                body: { lectureTitle }
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getCourseLecture: builder.query({
            query: ( courseId ) => ({
                url: `/${courseId}/lecture`,
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
        editLecture: builder.mutation({
            query: ({ courseId, lectureId, lectureTitle, videoInfo, isPreviewFree }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: "POST",
                body: { lectureTitle, videoInfo, isPreviewFree }
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        removeLecture: builder.mutation({
            query: ({ courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: "DELETE",
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
        getLectureById: builder.query({
            query: ({ courseId, lectureId }) => ({
                url: `/${courseId}/lecture/${lectureId}`,
                method: "GET",
            }),
            providesTags: ['Refetch_Creator_Course']
        }),
        publishCourse: builder.mutation({
            query: ({ courseId , query}) => ({
                url: `/${courseId}?publish=${query}`,
                method: "PATCH",
            }),
            invalidatesTags: ['Refetch_Creator_Course']
        }),
    }),
})

export const { useCreateCourseMutation, useGetCreatorCoursesQuery, useEditCourseMutation , useGetCourseByIdQuery , useCreateLectureMutation , useGetCourseLectureQuery , useEditLectureMutation , useRemoveLectureMutation , useGetLectureByIdQuery , usePublishCourseMutation } = courseApi
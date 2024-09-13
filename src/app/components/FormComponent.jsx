"use client";

import React, { useState } from "react";
import { Formik, Form } from "formik";
import RichTextEditor from "./RichTextEditor"; // Pastikan path ini benar

const FormComponent = ({ onFormSubmit }) => {
	const [editorValue, setEditorValue] = useState("");

	const handleSubmit = (values, { resetForm }) => {
		onFormSubmit(values);
		resetForm();
		setEditorValue(""); // Kosongkan state editor setelah submit
	};

	return (
		<Formik initialValues={{ richTextContent: "" }} onSubmit={handleSubmit}>
			{({ setFieldValue }) => (
				<Form className='space-y-4'>
					<div>
						<RichTextEditor
							value={editorValue}
							onChange={(content) => {
								setFieldValue("richTextContent", content);
								setEditorValue(content); // Update state lokal untuk editor
							}}
						/>
					</div>
					<button
						type='submit'
						className='bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-600 transition'
					>
						Submit
					</button>
				</Form>
			)}
		</Formik>
	);
};

export default FormComponent;

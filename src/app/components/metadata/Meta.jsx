// components/Meta.js
import React from "react";
import Head from "next/head";

const Meta = ({ title, description, image, url }) => {
	return (
		<Head>
			<title>{title} | Bukan BlogSpot!</title>
			<meta
				name='description'
				content={description || "Baca artikel menarik di Bukan BlogSpot!"}
			/>
			<meta property='og:title' content={title} />
			<meta
				property='og:description'
				content={description || "Baca artikel menarik di Bukan BlogSpot!"}
			/>
			<meta property='og:image' content={image} />
			<meta property='og:url' content={url} />
		</Head>
	);
};

export default Meta;

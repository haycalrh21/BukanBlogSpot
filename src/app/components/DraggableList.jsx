import React, { useState } from "react";
import {
	DndContext,
	DragOverlay,
	PointerSensor,
	KeyboardSensor,
	useSensors,
	useSensor,
} from "@dnd-kit/core";
import {
	SortableContext,
	sortableKeyboardCoordinates,
	arrayMove,
	useSortable,
} from "@dnd-kit/sortable";
import Input from "./ui/Input";

const SortableItem = ({ id, children }) => {
	const { attributes, listeners, setNodeRef, transform, transition } =
		useSortable({ id });

	return (
		<div
			ref={setNodeRef}
			style={{
				transform: transform
					? `translate3d(${transform.x}px, ${transform.y}px, 0)`
					: undefined,
				transition,
			}}
			{...attributes}
			{...listeners}
			className='bg-white p-4 rounded-lg shadow-md mb-3 transition-all transform-gpu hover:scale-[1.01] hover:shadow-lg'
		>
			<div className='text-gray-800'>{children}</div>
		</div>
	);
};

const DraggableList = ({
	items,
	setItems,
	title,
	setTitle,
	setImageThumbnail,
}) => {
	const [imageFile, setImageFile] = useState(null);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const handleDragEnd = (event) => {
		const { active, over } = event;

		if (active.id !== over.id) {
			const oldIndex = items.findIndex((i) => i.id === active.id);
			const newIndex = items.findIndex((i) => i.id === over.id);

			const reorderedItems = arrayMove(items, oldIndex, newIndex);
			setItems(reorderedItems);
		}
	};

	const handleFileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImageFile(reader.result); // Save as base64
				setImageThumbnail(reader.result); // Set the image thumbnail
			};
			reader.readAsDataURL(file);
		}
	};

	return (
		<>
			<Input
				placeholder='Enter title...'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				className='mb-6 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
			/>

			<input
				type='file'
				accept='image/*'
				onChange={handleFileChange}
				className='mb-4 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100'
			/>

			<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
				<SortableContext items={items.map((item) => item.id)}>
					{items.map((item, index) => (
						<SortableItem key={item.id} id={item.id} index={index}>
							{item.content}
						</SortableItem>
					))}
				</SortableContext>
				<DragOverlay>{/* Custom draggable item if needed */}</DragOverlay>
			</DndContext>

			{imageFile && (
				<div className='mt-4'>
					<img
						src={imageFile}
						alt='Uploaded Image'
						className='max-w-[1280px] max-h-[720px] w-auto h-auto object-cover'
					/>
				</div>
			)}
		</>
	);
};

export default DraggableList;

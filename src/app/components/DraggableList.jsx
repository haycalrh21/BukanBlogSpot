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

const SortableItem = ({ id, children, onDelete }) => {
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
      className="bg-emerald-500 p-4 rounded-lg mb-3 shadow-md hover:shadow-xs transition-all relative"
    >
      <button
        onClick={() => onDelete(id)}
        className="absolute top-2 right-2 text-white bg-red-600 p-1 rounded-full hover:bg-red-700"
      >
        &times;
      </button>
      <div className="text-white truncate">{children}</div>
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
  const [activeId, setActiveId] = useState(null);

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

    setActiveId(null);
  };

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
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

  const handleDeleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const handleClearImage = () => {
    setImageFile(null);
    setImageThumbnail(null);
  };

  // Fungsi untuk menghapus semua item
  const handleDeleteAll = () => {
    setItems([]);
  };

  return (
    <>
      <Input
        placeholder="Enter title..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="mb-6 w-full p-3 border border-gray-300 rounded-lg"
      />

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-500 border border-black rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />

      {imageFile && (
        <div className="mt-4 relative">
          <img
            src={imageFile}
            alt="Uploaded Image"
            className="max-w-full max-h-80 object-cover mx-auto" // Responsif dan terpusat
          />
          <button
            onClick={handleClearImage}
            className="absolute top-2 right-2 text-white bg-red-600 p-1 rounded-full hover:bg-red-700"
          >
            &times;
          </button>
        </div>
      )}

      {/* Tombol hapus semua */}

      <DndContext
        onDragEnd={handleDragEnd}
        onDragStart={handleDragStart}
        sensors={sensors}
      >
        <SortableContext items={items.map((item) => item.id)}>
          {items.map((item) => (
            <SortableItem
              key={item.id}
              id={item.id}
              onDelete={handleDeleteItem}
            >
              {item.content}
            </SortableItem>
          ))}
        </SortableContext>
        <button
          onClick={handleDeleteAll}
          className="w-full font-head px-8 py-3 bg-red-500 border-2 border-black shadow-md hover:shadow-xs transition-all mt-4"
        >
          Hapus Semua
        </button>
        <DragOverlay>
          {/* Optional: Custom draggable item rendering */}
        </DragOverlay>
      </DndContext>
    </>
  );
};

export default DraggableList;

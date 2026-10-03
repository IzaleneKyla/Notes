type Note = {
  id: number;
  title: string;
  description: string;
};

type NoteItemProps = {
  note: Note;
  onDelete: (id: number) => void;
  onEdit: (note: Note) => void;
};

export default function NoteItem({
  note,
  onDelete,
  onEdit,
}: NoteItemProps) {
  return (
    <article className="note-item">

      <div className="note-tape"></div>

      <div className="note-content">
        <div className="note-star">✦</div>

        <h3>{note.title}</h3>

        <p>{note.description}</p>
      </div>

      <div className="note-actions">
        <button
          className="edit-button"
          onClick={() => onEdit(note)}
        >
          Edit
        </button>

        <button
          className="delete-button"
          onClick={() => onDelete(note.id)}
        >
          Delete
        </button>
      </div>

    </article>
  );
}
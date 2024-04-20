export default function Heading3({ title }) {
    return (
      <div>
        <h3 className="text-xl title-color font-roboto my-1">
          {title.toUpperCase()}
        </h3>
      </div>
    );
  }
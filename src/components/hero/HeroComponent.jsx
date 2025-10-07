export default function HeroComponent({ title, description, btn }) {
  console.log(title, description, btn);
  return (
    <header className="bg-background px-6 md:px-60 py-16">
      <div className="flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Texto */}
        <div className="text-center max-w-xl">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">
            {title}
          </h2>
          <p className="text-base text-primary-70 leading-relaxed mb-6">
            {description}
          </p>
          <button className="bg-gray-100 text-t-dark-btn text-sm font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition duration-200">
            {btn}
          </button>
        </div>
      </div>
    </header>
  );
}

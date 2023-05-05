export default function Home() {
  return (
    <main className={`flex min-h-screen flex-col items-center p-5`}>
      <h1 className='font-extrabold text-center mb-9'>Thom McCarthy</h1>
      <div className='border-indigo-800 backgroundGlass border-2 py-9 px-5 rounded-lg max-w-4xl block w-10/12'>
        <p>
          I{`'`}m a <strong>UI Engineer</strong> based in{' '}
          <strong>West Philadelphia</strong>
          <br />
          <br />I build thoughful, empathetic and robustly accessible web
          interfaces.
        </p>
      </div>
    </main>
  );
}

export default function PageLoading() {
  return (
    <div className="flex min-h-full w-full items-center justify-center rounded-2xl border border-mist-700 bg-zinc-950">
      <div role="status" aria-label="Loading" className="h-10 w-10 animate-spin rounded-full border-4 border-gray-600 border-t-amber-500" />
    </div>
  );
}

export default function Page() {
    return (
        <section className="py-12 bg-gray-900 text-gray-100 sm:py-12 lg:py-16">
            <div className="px-4 mx-auto sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="mt-1 text-4xl font-extrabold sm:text-5xl lg:text-6xl">100 day challenge</p>
                    <p className="max-w-xl mx-auto mt-5 text-xl text-gray-400">Learning tailwind through the 100 days challenge for CSS</p>
                </div>
                <div className="grid grid-cols-1 mx-auto mt-8 text-center gap-y-4 sm:gap-x-8 sm:grid-cols-2 lg:grid-cols-3 sm:mt-12 lg:mt-20 sm:text-left h-96">
                    <div className="flex flex-col bg-gray-100 shadow-md rounded-lg">
                        <div className="m-3 bg-white flex flex-col rounded-md h-full">
                            <div className="flex justify-center overflow-hidden bg-gradient-to-tr from-blue-700 to-pink-500 via-purple-500 rounded-t-md p-2 h-3/4">
                                <div className=""></div>
                            </div>
                            <div className="flex flex-col text-center p-2 h-1/4">
                                <p className="text-gray-900 font-bold text-xl pb-1">Day 1</p>
                                <p className="text-gray-600 pt-1">Custom built number with gradient</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
import { useCodingGoodsTitle } from "./hooks/useCodingGoods";
import { SearchableSelect } from "./components/SearchableSelect";
import { Loading } from "./components/Loading";
import { useEditField } from "./api/addData";
import { useState } from "react";
import type { ICodingGoodsListItem } from "./types/apiTypes";

function App() {
  const {
    data: codingGoodsTitle,
    isLoading,
    isError,
    error,
  } = useCodingGoodsTitle();

  const [selectedItem, setSelectedItem] = useState<ICodingGoodsListItem | null>(
    null
  );

  const codesazeField = useEditField(
    selectedItem,
    "codesaze",
    "کد ساز سیم با موفقیت بروزرسانی شد!",
    "خطا در بروزرسانی کد ساز سیم!",
    setSelectedItem
  );

  const codearmanField = useEditField(
    selectedItem,
    "codearman",
    "کد آرمان الکتریک ارگ با موفقیت بروزرسانی شد!",
    "خطا در بروزرسانی کد آرمان الکتریک ارگ!",
    setSelectedItem
  );

  const codeesnovaField = useEditField(
    selectedItem,
    "codeesnova",
    "کد اسنوا با موفقیت بروزرسانی شد!",
    "خطا در بروزرسانی کد اسنوا!",
    setSelectedItem
  );

  const renderFieldEditor = (
    label: string,
    value: string | null | undefined,
    field: ReturnType<typeof useEditField>,
    placeholder: string
  ) => (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-700 text-sm font-semibold">
          {label}:
        </strong>
      </div>
      {field.isEditing ? (
        <div className="flex items-center gap-2 flex-wrap">
          <input
            type="text"
            value={field.editingValue}
            onChange={(e) => field.setEditingValue(e.target.value)}
            className="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0ead69] focus:border-transparent text-sm"
            placeholder={placeholder}
          />
          <div
            onClick={field.isSaving ? undefined : field.handleSave}
            className={`px-4 py-2 bg-[#0ead69] text-white rounded-lg transition-colors text-sm font-medium ${
              field.isSaving
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-[#0d9557] cursor-pointer"
            }`}
          >
            {field.isSaving ? "در حال ذخیره..." : "ثبت"}
          </div>
          <div
            onClick={field.isSaving ? undefined : field.handleCancel}
            className={`px-4 py-2 bg-gray-500 text-white rounded-lg transition-colors text-sm font-medium ${
              field.isSaving
                ? "opacity-60 cursor-not-allowed"
                : "hover:bg-gray-600 cursor-pointer"
            }`}
          >
            لغو
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">{value || "تعریف نشده"}</span>
          <div
            onClick={field.handleEdit}
            className="px-3 py-1 bg-[#0ead69] text-white rounded-lg hover:bg-[#0d9557] transition-colors text-xs font-medium"
          >
            ویرایش
          </div>
        </div>
      )}
    </div>
  );

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl font-semibold mb-2">
            خطا در بارگذاری داده‌ها
          </div>
          <div className="text-gray-600">{error?.message || "خطای نامشخص"}</div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-[#0ead69] text-white rounded-lg shadow-lg mb-8 p-6">
          <span className="text-2xl font-bold text-center text-white">
            مدیریت کدهای انبار مشتری
          </span>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <label className="block mb-3 text-gray-700 font-semibold">
            انتخاب عنوان محصول:
          </label>
          <SearchableSelect
            options={codingGoodsTitle || []}
            value={selectedItem}
            onChange={setSelectedItem}
            placeholder="جستجو و انتخاب کنید..."
          />
        </div>

        {selectedItem && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
              اطلاعات محصول انتخاب شده
            </h2>

            <div className="mb-4">
              <strong className="text-gray-700 text-sm font-semibold">
                شرح محصول:
              </strong>
              <p className="text-gray-600 text-sm mt-1">
                {selectedItem.sharhmahsolbarayefactor || "تعریف نشده"}
              </p>
            </div>

            <div className="border-t border-gray-200 pt-4 mt-4">
              {renderFieldEditor(
                "کد ساز سیم",
                selectedItem.codesaze,
                codesazeField,
                "کد ساز سیم را وارد کنید..."
              )}

              {renderFieldEditor(
                "کد ساز آرمان الکتریک ارگ",
                selectedItem.codearman,
                codearmanField,
                "کد محصول آرمان الکتریک ارگ را وارد کنید..."
              )}

              {renderFieldEditor(
                "کد اسنوا",
                selectedItem.codeesnova,
                codeesnovaField,
                "کد اسنوا را وارد کنید..."
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
              <div>
                <strong className="text-gray-700 text-sm font-semibold block mb-1">
                  کد نهایی محصول:
                </strong>
                <p className="text-gray-600 text-sm">{selectedItem.Title}</p>
              </div>
              <div>
                <strong className="text-gray-700 text-sm font-semibold block mb-1">
                  شناسه:
                </strong>
                <p className="text-gray-600 text-sm">{selectedItem.ID}</p>
              </div>
              <div>
                <strong className="text-gray-700 text-sm font-semibold block mb-1">
                  کد:
                </strong>
                <p className="text-gray-600 text-sm">
                  {selectedItem.coding || "تعریف نشده"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700 text-sm font-semibold block mb-1">
                  گروه:
                </strong>
                <p className="text-gray-600 text-sm">
                  {selectedItem.group || "تعریف نشده"}
                </p>
              </div>
              <div>
                <strong className="text-gray-700 text-sm font-semibold block mb-1">
                  رنگ:
                </strong>
                <p className="text-gray-600 text-sm">
                  {selectedItem.rang || "تعریف نشده"}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default App;

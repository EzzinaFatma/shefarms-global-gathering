import { useState, type FormEvent } from "react";
import { Plus, Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { toast } from "sonner";
import { useI18n } from "@/lib/i18n";
import type { FinancialTransaction } from "@/lib/demo-store";

interface FinancialModuleProps {
  transactions: FinancialTransaction[];
  onAdd: (tx: FinancialTransaction) => void;
}

export function FinancialModule({ transactions, onAdd }: FinancialModuleProps) {
  const { t } = useI18n();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("Crop Sales");
  const [type, setType] = useState<"revenue" | "expense">("revenue");
  const [amount, setAmount] = useState("");

  const revenue = transactions.filter((x) => x.type === "revenue").reduce((sum, x) => sum + x.amountTnd, 0);
  const expenses = transactions.filter((x) => x.type === "expense").reduce((sum, x) => sum + x.amountTnd, 0);
  const netProfit = revenue - expenses;
  const savingsGoal = 12000;
  const savingsPct = Math.min(100, Math.max(0, Math.round((netProfit / savingsGoal) * 100)));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const num = Number(amount);
    if (!description.trim() || Number.isNaN(num) || num <= 0) {
      toast.error(t("Enter a description and positive amount in TND.", "Saisissez une description et un montant positif en TND.", "أدخل وصفاً ومبلغاً موجباً بالدينار التونسي."));
      return;
    }
    onAdd({
      id: `f-${Date.now()}`,
      date: new Date().toISOString().slice(0, 10),
      description: description.trim(),
      category,
      type,
      amountTnd: num,
    });
    setDescription("");
    setAmount("");
    toast.success(t("Transaction recorded (TND).", "Transaction enregistrée (TND).", "تم تسجيل العملية المالية."));
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><TrendingUp className="h-3.5 w-3.5 text-primary" /> {t("Total Revenue", "Revenus Totaux", "إجمالي الإيرادات")}</p>
          <p className="mt-2 font-editorial text-3xl font-bold text-primary">{revenue.toLocaleString()} TND</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><TrendingDown className="h-3.5 w-3.5 text-terracotta" /> {t("Total Expenses", "Dépenses Totales", "إجمالي المصاريف")}</p>
          <p className="mt-2 font-editorial text-3xl font-bold text-terracotta">{expenses.toLocaleString()} TND</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Wallet className="h-3.5 w-3.5 text-forest" /> {t("Net Profit", "Bénéfice Net", "صافي الربح")}</p>
          <p className="mt-2 font-editorial text-3xl font-bold text-forest">{netProfit.toLocaleString()} TND</p>
        </div>
        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="text-xs text-muted-foreground">{t("Cooperative Savings Goal", "Objectif d'Épargne", "هدف الادخار التعاوني")}</p>
          <p className="mt-2 font-editorial text-2xl font-bold text-forest">{savingsPct}% of {savingsGoal.toLocaleString()} TND</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div className="h-full bg-primary" style={{ width: `${savingsPct}%` }} />
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-card p-5">
        <h2 className="font-editorial text-2xl font-bold text-forest">{t("Record Transaction (TND)", "Nouvelle Transaction (TND)", "تسجيل عملية مالية (دينار تونسي)")}</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder={t("Description...", "Description...", "الوصف...")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm lg:col-span-2" />
          <select value={category} onChange={(e) => setCategory(e.target.value)} className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
            <option>Crop Sales</option>
            <option>Inputs & Seeds</option>
            <option>Equipment</option>
            <option>Logistics</option>
          </select>
          <select value={type} onChange={(e) => setType(e.target.value as "revenue" | "expense")} className="rounded-xl border border-input bg-background px-3 py-2 text-sm">
            <option value="revenue">{t("Revenue (+)", "Revenu (+)", "إيراد (+)")}</option>
            <option value="expense">{t("Expense (-)", "Dépense (-)", "مصروف (-)")}</option>
          </select>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Amount (TND)" className="rounded-xl border border-input bg-background px-3 py-2 text-sm" />
        </div>
        <button type="submit" className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground hover:bg-forest">
          <Plus className="h-4 w-4" /> {t("Add Transaction", "Ajouter", "إضافة العملية")}
        </button>
      </form>

      <div className="overflow-x-auto rounded-2xl border border-border bg-card">
        <table className="w-full text-start text-sm">
          <thead className="border-b border-border bg-secondary/40 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="px-4 py-3 text-start">{t("Date", "Date", "التاريخ")}</th>
              <th className="px-4 py-3 text-start">{t("Description", "Description", "الوصف")}</th>
              <th className="px-4 py-3 text-start">{t("Category", "Catégorie", "الفئة")}</th>
              <th className="px-4 py-3 text-end">{t("Amount (TND)", "Montant (TND)", "المبلغ (د.ت)")}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {transactions.map((tx) => (
              <tr key={tx.id}>
                <td className="px-4 py-3 text-xs text-muted-foreground">{tx.date}</td>
                <td className="px-4 py-3 font-medium text-foreground">{tx.description}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{tx.category}</td>
                <td className={`px-4 py-3 text-end font-semibold ${tx.type === "revenue" ? "text-primary" : "text-terracotta"}`}>
                  {tx.type === "revenue" ? "+" : "-"}{tx.amountTnd.toLocaleString()} TND
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
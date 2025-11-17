<script lang="ts">
	import type { BiodataForm, PerguruanTinggi } from '$lib/types/quiz';

	interface Props {
		biodata: BiodataForm;
		onNext: () => void;
	}

	let { biodata = $bindable(), onNext }: Props = $props();

	let errors = $state<{ nama?: string; nomorHP?: string; universitas?: string }>({});
	let universitasList = $state<PerguruanTinggi[]>([]);
	let showDropdown = $state(false);
	let isLoading = $state(false);
	let searchTimeout: ReturnType<typeof setTimeout>;
	let searchKeyword = $state('');

	async function searchUniversitas(keyword: string) {
		if (!keyword || keyword.length < 2) {
			universitasList = [];
			showDropdown = false;
			return;
		}

		isLoading = true;
		try {
			const response = await fetch(
				`/api/universitas?keyword=${encodeURIComponent(keyword)}&halaman=1&perHalaman=10`
			);
			const result = await response.json();

			if (result.data?.semuaPerguruanTinggi?.data) {
				universitasList = result.data.semuaPerguruanTinggi.data;
				showDropdown = universitasList.length > 0;
			} else {
				universitasList = [];
				showDropdown = false;
			}
		} catch (error) {
			console.error('Error fetching universitas:', error);
			universitasList = [];
			showDropdown = false;
		} finally {
			isLoading = false;
		}
	}

	function handleUniversitasInput(e: Event) {
		const target = e.target as HTMLInputElement;
		searchKeyword = target.value;
		biodata.universitas = target.value;
		biodata.provinsi = undefined;

		clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			searchUniversitas(searchKeyword);
		}, 300);
	}

	function selectUniversitas(pt: PerguruanTinggi) {
		biodata.universitas = pt.nama;
		biodata.provinsi = pt.provinsi;
		searchKeyword = pt.nama;
		showDropdown = false;
		universitasList = [];
	}

	function validateForm() {
		errors = {};

		if (!biodata.nama.trim()) {
			errors.nama = 'Nama harus diisi';
		}

		if (!biodata.nomorHP.trim()) {
			errors.nomorHP = 'Nomor HP harus diisi';
		} else if (!/^[\d\s\-\+\(\)]+$/.test(biodata.nomorHP)) {
			errors.nomorHP = 'Format nomor HP tidak valid';
		}

		if (!biodata.universitas.trim()) {
			errors.universitas = 'Universitas harus dipilih';
		}

		return Object.keys(errors).length === 0;
	}

	function handleSubmit(e: Event) {
		e.preventDefault();
		if (validateForm()) {
			onNext();
		}
	}

	function handleClickOutside(e: MouseEvent) {
		const target = e.target as HTMLElement;
		if (!target.closest('.autocomplete-container')) {
			showDropdown = false;
		}
	}

	$effect(() => {
		if (typeof window !== 'undefined') {
			document.addEventListener('click', handleClickOutside);
			return () => {
				document.removeEventListener('click', handleClickOutside);
			};
		}
	});
</script>

<div class="mx-auto max-w-md">
	<div class="rounded-lg border border-gray-200 bg-white p-10 shadow-sm">
		<h2 class="mb-6 text-center text-2xl font-semibold text-gray-900">Biodata Pengunjung</h2>
		<form onsubmit={handleSubmit} class="space-y-6">
			<div>
				<label for="nama" class="mb-2 block text-sm font-medium text-gray-700">Nama</label>
				<input
					type="text"
					id="nama"
					bind:value={biodata.nama}
					placeholder="Masukkan nama lengkap"
					class="w-full rounded-md border px-3 py-2.5 text-base transition-all focus:ring-3 focus:ring-gray-900/10 focus:outline-none {errors.nama
						? 'border-red-600'
						: 'border-gray-300 focus:border-gray-700'}"
				/>
				{#if errors.nama}
					<p class="mt-2 text-sm text-red-600">{errors.nama}</p>
				{/if}
			</div>

			<div>
				<label for="nomorHP" class="mb-2 block text-sm font-medium text-gray-700">Nomor HP</label>
				<input
					type="text"
					id="nomorHP"
					bind:value={biodata.nomorHP}
					placeholder="Contoh: 08123456789"
					class="w-full rounded-md border px-3 py-2.5 text-base transition-all focus:ring-3 focus:ring-gray-900/10 focus:outline-none {errors.nomorHP
						? 'border-red-600'
						: 'border-gray-300 focus:border-gray-700'}"
				/>
				{#if errors.nomorHP}
					<p class="mt-2 text-sm text-red-600">{errors.nomorHP}</p>
				{/if}
			</div>

			<div class="autocomplete-container relative">
				<label for="universitas" class="mb-2 block text-sm font-medium text-gray-700">
					Asal Universitas/Instansi
				</label>
				<input
					type="text"
					id="universitas"
					value={searchKeyword}
					oninput={handleUniversitasInput}
					onfocus={() => {
						if (universitasList.length > 0) showDropdown = true;
					}}
					placeholder="Ketik untuk mencari universitas..."
					autocomplete="off"
					class="w-full rounded-md border px-3 py-2.5 text-base transition-all focus:ring-3 focus:ring-gray-900/10 focus:outline-none {errors.universitas
						? 'border-red-600'
						: 'border-gray-300 focus:border-gray-700'}"
				/>
				{#if errors.universitas}
					<p class="mt-2 text-sm text-red-600">{errors.universitas}</p>
				{/if}

				{#if isLoading}
					<div class="absolute top-[42px] right-3 text-gray-400">
						<svg
							class="h-5 w-5 animate-spin"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
						>
							<circle
								class="opacity-25"
								cx="12"
								cy="12"
								r="10"
								stroke="currentColor"
								stroke-width="4"
							></circle>
							<path
								class="opacity-75"
								fill="currentColor"
								d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
							></path>
						</svg>
					</div>
				{/if}

				{#if showDropdown && universitasList.length > 0}
					<div
						class="absolute z-10 mt-1 max-h-60 w-full overflow-y-auto rounded-md border border-gray-200 bg-white shadow-lg"
					>
						{#each universitasList as pt}
							<button
								type="button"
								onclick={() => selectUniversitas(pt)}
								class="w-full border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-b-0 hover:bg-gray-50"
							>
								<div class="text-sm font-medium text-gray-900">{pt.nama}</div>
								<div class="mt-1 text-xs text-gray-500">{pt.provinsi}</div>
							</button>
						{/each}
					</div>
				{/if}
			</div>

			<button
				type="submit"
				class="w-full rounded-md bg-gray-900 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-800"
			>
				Mulai Kuis
			</button>
		</form>
	</div>
</div>

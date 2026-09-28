<div align="center">

<img src="assets/logo.svg" width="112" alt="Markdown Formatting Assistant">

# Markdown Formatting Assistant

**클릭 한 번, 키 한 번으로 서식 지정**<br>
사이드 패널, 검색 창, 나만의 도구 모음 — Markdown, HTML, LaTeX, 표, 콜아웃 지원

<a href="README.md"><img src="https://img.shields.io/badge/-English-2a2d36?style=flat-square" alt="English"></a>
<a href="README.be.md"><img src="https://img.shields.io/badge/-%D0%91%D0%B5%D0%BB%D0%B0%D1%80%D1%83%D1%81%D0%BA%D0%B0%D1%8F-2a2d36?style=flat-square" alt="Беларуская"></a>
<a href="README.de.md"><img src="https://img.shields.io/badge/-Deutsch-2a2d36?style=flat-square" alt="Deutsch"></a>
<a href="README.es.md"><img src="https://img.shields.io/badge/-Espa%C3%B1ol-2a2d36?style=flat-square" alt="Español"></a>
<a href="README.fr.md"><img src="https://img.shields.io/badge/-Fran%C3%A7ais-2a2d36?style=flat-square" alt="Français"></a>
<a href="README.it.md"><img src="https://img.shields.io/badge/-Italiano-2a2d36?style=flat-square" alt="Italiano"></a>
<a href="README.ja.md"><img src="https://img.shields.io/badge/-%E6%97%A5%E6%9C%AC%E8%AA%9E-2a2d36?style=flat-square" alt="日本語"></a>
<a href="README.ko.md"><img src="https://img.shields.io/badge/-%ED%95%9C%EA%B5%AD%EC%96%B4-7c3aed?style=flat-square" alt="한국어"></a>
<a href="README.pt.md"><img src="https://img.shields.io/badge/-Portugu%C3%AAs-2a2d36?style=flat-square" alt="Português"></a>
<a href="README.ru.md"><img src="https://img.shields.io/badge/-%D0%A0%D1%83%D1%81%D1%81%D0%BA%D0%B8%D0%B9-2a2d36?style=flat-square" alt="Русский"></a>
<a href="README.uk.md"><img src="https://img.shields.io/badge/-%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D1%81%D1%8C%D0%BA%D0%B0-2a2d36?style=flat-square" alt="Українська"></a>
<a href="README.zh.md"><img src="https://img.shields.io/badge/-%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87-2a2d36?style=flat-square" alt="简体中文"></a>

<a href="https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/releases/latest"><img src="https://img.shields.io/github/v/release/Reocin/obsidian-markdown-formatting-assistant-plugin?style=for-the-badge&label=%EB%B2%84%EC%A0%84&labelColor=1c1e25&color=8cc3fc" alt="버전"></a>
<a href="https://community.obsidian.md/plugins/obsidian-markdown-formatting-assistant-plugin"><img src="https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fobsidianmd%2Fobsidian-releases%2Fmaster%2Fcommunity-plugin-stats.json&query=%24%5B%22obsidian-markdown-formatting-assistant-plugin%22%5D.downloads&label=%EB%8B%A4%EC%9A%B4%EB%A1%9C%EB%93%9C&style=for-the-badge&labelColor=1c1e25&color=a78bfa&logo=obsidian&logoColor=white" alt="다운로드"></a>
<img src="https://img.shields.io/badge/obsidian-1.0%2B-b7b5fc?style=for-the-badge&labelColor=1c1e25" alt="Obsidian 1.0+">
<a href="LICENSE"><img src="https://img.shields.io/github/license/Reocin/obsidian-markdown-formatting-assistant-plugin?style=for-the-badge&label=%EB%9D%BC%EC%9D%B4%EC%84%A0%EC%8A%A4&labelColor=1c1e25&color=e4b572" alt="라이선스"></a>
<a href="https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/stargazers"><img src="https://img.shields.io/github/stars/Reocin/obsidian-markdown-formatting-assistant-plugin?style=for-the-badge&label=%EC%8A%A4%ED%83%80&labelColor=1c1e25&color=f8a49d" alt="스타"></a>

<br>

<img src="assets/overview.png" alt="오른쪽에 사이드 패널, 노트 위에 도구 모음이 있는 Obsidian">

<br>

<a href="https://community.obsidian.md/plugins/obsidian-markdown-formatting-assistant-plugin"><img src="https://img.shields.io/badge/Obsidian%EC%97%90%20%EC%84%A4%EC%B9%98-7c3aed?style=for-the-badge&logo=obsidian&logoColor=white" height="36" alt="Obsidian에 설치"></a>

<sub>Obsidian 1.0 이상 · 데스크톱과 모바일 · 12개 언어 · 무료 오픈 소스</sub>

</div>

> 이 문서는 영어 README의 번역이며 아직 원어민의 검토를 거치지 않았습니다. 수정 제안은 [issues](https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/issues)에서 환영합니다.

- **사이드 패널**에는 순서를 바꾸고, 접고, 끌 수 있는 일곱 개의 섹션이 있으며, 버튼은 왼쪽, 가운데, 오른쪽으로 정렬할 수 있습니다.
- <strong>`Alt+Q`</strong>는 약 160개의 스니펫을 사용 중인 언어나 영어 이름으로 검색합니다. <strong>`Alt+C`</strong>는 26가지 콜아웃에 대해 같은 일을 합니다.
- 모든 텍스트 편집 동작과 모든 콜아웃에 원하는 **단축키**를 지정할 수 있습니다.
- **노트 위 도구 모음**은 기본적으로 꺼져 있으며, 보관함의 어떤 명령이든 원하는 순서로 올릴 수 있습니다.
- **색상 선택기**는 클릭 한 번으로 선택한 텍스트에 색을 입히고, 최근 사용한 색과 저장한 색을 기억합니다.
- **12개 언어**를 지원하며, 기본적으로 Obsidian의 언어를 따릅니다.
- **키보드만으로 조작할 수 있고** 스크린 리더에서도 작동합니다.

[Reocin](https://github.com/Reocin)이 만들었고 2026년에 유지 관리를 넘겼습니다. 0.5.0 이후 버전은 같은 저장소에서 Mark Karte와 Claude가 유지 관리합니다.

## 설치

Obsidian에서 `설정 → 커뮤니티 플러그인`을 열고 **탐색**을 누른 다음, *Markdown Formatting Assistant*를 검색해 **설치**와 **활성화**를 누릅니다.

직접 설치하려면 [최신 릴리스](https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/releases/latest)에서 `main.js`, `manifest.json`, `styles.css`를 내려받아 `<vault>/.obsidian/plugins/obsidian-markdown-formatting-assistant-plugin/`에 넣고 플러그인을 활성화합니다.

## 사이드 패널

왼쪽 리본 메뉴의 아이콘이나, 다른 명령처럼 단축키를 지정할 수 있는 *Markdown Formatting Assistant 열기* 명령으로 엽니다. 패널은 오른쪽 사이드바에 열리며, 설정의 `사이드 패널 위치`로 왼쪽으로 옮길 수 있습니다 — 바꾼 뒤에는 리본 아이콘을 다시 누르세요.

패널은 자신이 놓인 창의 너비를 따르므로, 창을 넓히거나 좁히면 버튼 격자가 그에 맞춰 다시 배치됩니다. 모바일에서도 작동합니다.

따로 정하지 않으면 버튼은 가운데에 놓입니다. 설정의 `패널 버튼 정렬`로 왼쪽이나 오른쪽에 맞출 수 있으며, 색상 견본, 표 선택기, 각 섹션 아래의 링크도 함께 옮겨집니다. 열려 있는 패널에도 바로 반영됩니다.

텍스트를 선택한 상태에서 서식 버튼(볼드체, 태그, 콜아웃 등)을 누르면 선택한 텍스트를 바꾸지 않고 감쌉니다. 아무것도 선택하지 않았으면 커서 위치에 삽입합니다.

### 섹션 배치하기

섹션은 머리글을 끌어서 옮기고, 화살표를 눌러 접습니다. 순서와 접힌 상태는 기억됩니다. 쓰지 않는 섹션은 설정에서 끌 수 있습니다.

![사이드 패널에서 섹션 머리글을 끌어 새 위치로 옮기는 모습](assets/OrderableAndExpandableRows.gif)

### 텍스트 편집

H1부터 H6까지의 제목, 볼드체, 이탤릭체, 밑줄, 취소선, 하이라이트, 인라인 코드, 코드 블록과 mermaid 블록, 링크, 내부 링크, 이미지, 인용, 그리고 글머리 목록, 번호 목록, 작업 목록. 이미 같은 제목이 있는 줄에서 그 제목 버튼을 누르면 제목이 제거됩니다.

인용과 목록은 줄 전체에 적용되므로, 줄의 어디에서 선택을 시작했는지나 커서가 어디에 있는지는 상관없습니다. 여러 줄에 일부만 걸친 선택도 그 줄을 모두 변환합니다. 사이에 있는 빈 줄은 그대로 두고, 인용 안에 추가하는 글머리 기호는 `>` 앞이 아니라 뒤에 들어갑니다. 같은 버튼을 다시 누르면 표식이 제거됩니다.

### 표

격자에서 크기를 고르면(머리글 행을 포함해 최대 6행 × 6열) 소스에서 열이 이미 가지런히 맞춰진 표가 삽입됩니다. 격자 아래의 정렬 버튼은 구분 행을 없음, 왼쪽, 가운데, 오른쪽으로 설정하며, 선택한 값은 다음 표를 위해 기억됩니다.

줄 중간에 삽입한 표는 별도의 줄로 옮겨지고, 커서 뒤에 있던 내용은 마지막 행에 붙지 않고 표 아래로 밀려납니다.

![사이드 패널의 텍스트 편집 섹션과 표 섹션](assets/panel-text-edit-tables.png)

### HTML

`<a>` `<abbr>` `<b>` `<br/>` `<center>` `<details>` `<dfn>` `<div>` `<em>` `<font>` `<hr/>` `<i>` `<img>` `<kbd>` `<mark>` `<p>` `<pre>` `<span>` `<strong>` `<sub>` `<summary>` `<sup>` `<table>` `<tbody>` `<td>` `<tfoot>` `<th>` `<thead>` `<tr>` `<u>`

태그는 아니지만 Obsidian에 해당하는 Markdown 문법이 없어서 HTML로 작성하는 두 가지도 있습니다: PDF 내보내기용 **페이지 나누기**와, 왼쪽·가운데·오른쪽·양쪽 맞춤의 **텍스트 정렬**입니다.

![사이드 패널의 HTML 섹션](assets/panel-html.png)

### LaTeX

> LaTeX 문법은 수식, 즉 `$...$` 또는 `$$...$$` 안에서만 작동합니다.

연산자 69개. 패널에 있는 33개는 자주 쓰는 것들입니다: 분수, 거듭제곱과 첨자, `\sqrt`, `\sum`, `\int`, `\prod`, `\lim`, `\partial`, `\infty`, 삼각함수, 괄호. 나머지 36개(관계 기호, 집합·논리 기호, 화살표, `\nabla`, `\binom`, `\overline`, 칠판 볼드체 등)는 `Alt+Q` 창에만 있으며, 그곳에서 이름으로 찾을 수 있습니다. 전부를 보여 주는 패널은 매번 훑어봐야 하는 기호의 벽이 될 것입니다.

![사이드 패널의 LaTeX 섹션](assets/panel-latex.png)

### 그리스 문자

> LaTeX처럼 그리스 문자도 수식 안에서만 작동합니다.

![사이드 패널의 그리스 문자 섹션](assets/panel-greek.png)

### 콜아웃

콜아웃 26종. 각각 해당하는 Obsidian 콜아웃 블록을 삽입합니다.

제목은 인터페이스 언어로 작성되므로, note 콜아웃은 Obsidian의 영어 기본값 대신 `> [!note] 노트`로 쓰입니다. 대괄호 안의 키워드는 항상 영어로 유지됩니다 — Obsidian은 이 키워드로 아이콘과 색을 정하기 때문입니다. 제목을 직접 입력하고 싶다면 `콜아웃 제목 삽입`을 끄세요.

선택한 텍스트는 콜아웃의 본문이 되며, 여러 문단에 걸친 선택도 콜아웃 안에 그대로 들어갑니다: 인용 표식이 모든 줄에 반복됩니다.

![사이드 패널의 콜아웃 섹션](assets/panel-callouts.png)

## 검색 창

`Alt+Q`는 텍스트 편집, HTML, LaTeX, 그리스 문자 섹션의 모든 스니펫(약 160개)을 검색하는 창을 엽니다. 이름을 몇 글자 입력하고 Enter를 누르세요. 커서가 어디에 있든, 텍스트를 선택했든 안 했든 작동하므로 손을 키보드에서 뗄 일이 없습니다. 이름은 인터페이스 언어로도 영어로도 똑같이 찾을 수 있으므로, `warning`과 `경고` 모두 같은 항목을 찾습니다.

`Alt+C`는 콜아웃용으로 같은 창을 엽니다.

표와 색상은 패널에만 있습니다.

![Alt+Q 창에 몇 글자를 입력하고 제안 항목을 삽입하는 모습](assets/Suggestion_Window_How_to_use_with_hotkey.gif)

두 키 모두 `설정 → 단축키`에서 바꿀 수 있습니다. *명령 선택기 열기* 또는 *콜아웃 선택기 열기*를 검색하세요.

![Obsidian의 단축키 설정에서 Alt+Q 단축키를 바꾸는 모습](assets/Suggestion_Window_change_hot_key.gif)

## 개별 명령의 단축키

모든 텍스트 편집 동작과 모든 콜아웃은 Obsidian 명령으로 등록되어 있으므로, `설정 → 단축키`에서 어느 것에든 키를 지정할 수 있습니다. 플러그인 이름으로 검색하면 전체 목록이 나옵니다. 처음부터 지정된 키는 `Alt+Q`와 `Alt+C`뿐이므로, 기존에 쓰던 단축키를 가로채지 않습니다.

여기에는 제목, 볼드체, 이탤릭체, 밑줄, 취소선, 하이라이트, 인라인 코드, 코드 블록과 mermaid 블록, 링크, 이미지, 인용, 세 가지 목록, 그리고 26가지 콜아웃이 포함됩니다. `H1`에 `Cmd+1`, `H2`에 `Cmd+2`를 지정하는 것이 흔한 배치입니다.

사이드 패널 자체에도 명령이 있어서, 리본 아이콘까지 손을 뻗지 않고도 열 수 있습니다.

HTML, LaTeX, 그리스 문자 섹션은 일부러 제외했습니다. 세 섹션을 합치면 138개 항목이 더 있는데, 단축키 목록은 `\alpha`를 찾기에 알맞은 곳이 아닙니다 — 알맞은 곳은 `Alt+Q` 창이며, 이 창은 그 모두를 검색합니다.

## 노트 위 도구 모음

편집기 상단에 버튼을 한 줄로 놓아, 사이드 패널을 닫아 둘 수 있게 합니다. 노트의 공간을 한 줄만큼 차지하기 때문에, `설정 → Markdown Formatting Assistant → 노트 위 도구 모음`에서 켜기 전까지는 꺼져 있습니다.

버튼은 Obsidian 명령일 뿐, 그 밖의 무엇도 아닙니다. 바로 그 점 때문에 이 줄을 꾸밀 가치가 있습니다: Obsidian 자체 명령이든, 이 플러그인의 명령이든, 다른 플러그인의 명령이든 보관함의 **어떤** 명령이든 올릴 수 있습니다. 검색 필드로 추가하고, 행을 끌어 작업하는 순서대로 배치하고, 한 번도 누르지 않는 버튼은 제거하세요.

처음에는 자주 쓰는 서식이 들어 있습니다: 제목, 볼드체, 이탤릭체, 취소선, 하이라이트, 인라인 코드, 인용, 세 가지 목록, 링크. 이 구성에 특별한 의미는 없으니, 모두 비우고 직접 구성하세요.

버튼은 줄의 왼쪽, 가운데, 오른쪽 중 어디에든 놓을 수 있습니다 — 평소 시선이 머무는 곳에 맞춰 고르세요.

![도구 모음 설정: 올려 둔 명령 목록, 정렬, 명령을 더 추가하는 버튼](assets/settings-toolbar.png)

모든 버튼이 노트에 내용을 쓰기 때문에 도구 모음은 편집 중에만 나타나고, 스크롤되는 대신 줄바꿈되므로 창이 좁으면 버튼의 절반이 가려지는 대신 한 줄 높이가 늘어납니다.

데스크톱 전용입니다. 모바일에서는 Obsidian이 이미 키보드 위에 도구 모음을 두므로, 하나 더 있으면 방해만 됩니다.

> Obsidian이 도구 모음을 둘 자리를 공식적으로 제공하지 않기 때문에, 도구 모음은 편집기 자체의 컨테이너 안에 삽입됩니다. 앞으로 Obsidian 새 버전에서 도구 모음이 옮겨지거나 사라진다면 가장 먼저 확인할 부분입니다.

## 색상 선택기

### 색상 고르기

`색상 선택`은 색상 선택기를 엽니다. 선택기를 닫으면 그 색이 바로 적용되고 — 선택한 텍스트가 있으면 거기에, 없으면 커서 위치에 — 클립보드에도 복사됩니다.

`최근 사용한 색상`에는 마지막으로 고른 색 10개가 Obsidian을 닫을 때까지 보관됩니다. `색상 저장`은 현재 색을 `저장한 색상`에 영구히 보관하며, 이 목록은 설정에서도 편집할 수 있습니다.

견본을 클릭하면 그 색을 다시 사용합니다. 견본을 마우스 오른쪽 버튼으로 클릭하면 삭제되고, 저장한 색은 끌어서 순서를 바꿀 수 있습니다.

![최근 사용한 색과 저장한 색이 표시된 사이드 패널의 색상 섹션](assets/panel-colors.png)

### 선택한 텍스트에 색 입히기

텍스트를 선택하고 색(최근 사용한 색, 저장한 색, 새로 고른 색)을 클릭하면, 선택한 부분이 그 색을 띠도록 감싸집니다. 클릭 한 번이면 되고, 미리 체크할 옵션은 없습니다.

`<font>` 태그는 글자 색만 지정할 수 있으므로, `background-color`를 체크하면 대신 `<span>`을 사용해 배경색을 입힙니다.

### 색상 코드 삽입하기

**아무것도** 선택하지 않았을 때는 체크박스가 클릭 시 커서 위치에 쓸 내용을 정합니다. 체크박스는 이미 작성 중인 태그에 붙여 넣을 코드 조각을 나타내므로, 선택 영역이 있을 때는 적용되지 않습니다 — "이 텍스트에 색을 입힌다"가 뜻할 수 있는 것은 한 가지뿐이기 때문입니다.

| 체크한 항목 | 커서 위치에 쓰이는 내용 |
| --- | --- |
| 없음 | `#ff0000` |
| `color` | `color: #ff0000` |
| `background-color` | `background-color: #ff0000` |
| 둘 다 | `color: #ff0000; background-color: #ff0000` |
| `style` (위 둘 중 하나와 함께) | `style="background-color: #ff0000"` |
| HTML | `<font color="#ff0000"></font>` (다른 항목의 체크 여부와 관계없이) |

## 언어

인터페이스는 12개 언어로 제공됩니다: English, Беларуская, Deutsch, Español, Français, Italiano, 日本語, 한국어, Português, Русский, Українська, 简体中文.

기본적으로 플러그인은 Obsidian 자체에 설정된 언어를 따릅니다. `설정 → Markdown Formatting Assistant → 언어`에서 특정 언어를 고를 수 있으며, Obsidian을 다시 시작한 뒤에 적용됩니다.

번역되는 것은 사용자가 읽는 부분뿐입니다. `> [!note]` 안의 콜아웃 키워드는 Obsidian이 그것으로 콜아웃을 판별하므로 영어로 유지됩니다. 검색 창은 번역된 이름과 원래의 영어 이름 모두로 찾을 수 있습니다.

영어와 러시아어 외의 번역은 아직 원어민의 검토를 받지 않았습니다 — 수정 제안을 무척 환영합니다. 각 언어는 `src/locales/` 아래의 파일 하나에 들어 있으며, 새 언어를 추가하려면 그 파일을 작성하고 `src/locales/index.ts`에 한 줄을 추가하면 됩니다.

## 키보드와 스크린 리더

`Tab`으로 사이드 패널의 모든 버튼에 도달할 수 있고, `Enter`와 `Space`로 누를 수 있으며, 포커스를 받은 버튼에는 윤곽선이 눈에 띄게 표시됩니다. 모든 버튼에는 이름이 있어 스크린 리더가 읽어 주고, 마우스를 올리면 툴팁으로도 표시됩니다 — 대부분의 버튼에는 텍스트가 아닌 그림이 들어 있어서, 이름이 없으면 읽어 줄 것이 없기 때문입니다.

## 설정

- **언어** — 기본값: Obsidian과 동일. 지원하는 12개 언어 중 하나를 고릅니다. 다시 시작한 뒤에 적용됩니다.
- **사이드 패널 위치** — 기본값: 오른쪽. 패널이 열리는 사이드바입니다.
- **패널 버튼 정렬** — 기본값: 가운데. 왼쪽, 가운데, 오른쪽: 패널 각 섹션의 버튼이 놓이는 위치이며, 색상 견본, 표 선택기, 각 섹션 아래의 링크도 함께 움직입니다. 바로 적용됩니다.
- **콜아웃 제목 삽입** — 기본값: 켜짐. 콜아웃 이름을 사용자의 언어로 제목에 씁니다. `[!note]` 안의 키워드는 어느 쪽이든 영어로 유지됩니다.
- **「*섹션 이름*」 섹션** — 기본값: 모두 켜짐. 사이드 패널의 모든 섹션을 각각 끌 수 있습니다. 다시 시작한 뒤에 적용됩니다.
- **노트 위 도구 모음** — 기본값: 꺼짐. 어떤 명령을 어떤 순서로 올릴지, 그리고 왼쪽, 가운데, 오른쪽 중 어디에 놓을지 정합니다. 데스크톱 전용입니다.
- **저장한 색상** — 저장한 색이 색상 선택기 옆에 견본으로 표시됩니다. 색을 고르면 추가되고, 견본을 클릭하면 삭제됩니다. 순서는 패널에 표시되는 순서와 같습니다.

![플러그인 설정 탭](assets/settings.png)

## 피드백

버그를 발견했거나, 필요한 태그나 연산자가 없나요? [이슈를 등록해](https://github.com/Reocin/obsidian-markdown-formatting-assistant-plugin/issues) 주세요. 패널에도 그곳으로 가는 링크가 있습니다.

## 개발

```
npm install
npm run build
```

빌드 결과물은 `build/`에 생성되며, Obsidian에 필요한 모든 파일인 `main.js`, `manifest.json`, `styles.css`가 들어 있습니다. 시험해 보려면 이 파일들을 `<vault>/.obsidian/plugins/obsidian-markdown-formatting-assistant-plugin/`에 복사하세요.

```
npm test
npm run typecheck
```

테스트는 Node 자체의 TypeScript 지원으로 실행되므로 따로 설치할 테스트 프레임워크가 없습니다 — Node 22.18 이상이면 충분합니다. 테스트 범위는 텍스트와 커서 위치 계산, 목록과 인용 표식, 색상 마크업, 12개 번역 파일의 일관성, 코드가 사용하는 클래스 이름과 스타일시트의 대조, 패널 버튼의 접근성, 그리고 이 저장소로 가는 링크입니다.

빌드와 함께 `npm run typecheck`도 실행하세요. Rollup은 `tsc`가 거부하는 코드도 빌드 성공으로 보고하므로, 여기서는 빌드가 성공했다는 것만으로는 별 의미가 없습니다.

## 변경 내역

영어로 작성된 [CHANGELOG.md](CHANGELOG.md)를 참고하세요.

## 라이선스

MIT. 이 플러그인은 첫 커밋부터 `package.json`에 MIT를 명시했지만 라이선스 전문을 함께 배포한 적이 없었기에, [LICENSE](LICENSE)에서 이를 명시적으로 밝히고 두 저자를 모두 표기합니다.
